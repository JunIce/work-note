require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/renderers/SimpleRenderer",
  "esri/renderers/smartMapping/creators/location",
  "esri/renderers/visualVariables/SizeVariable",
  "esri/widgets/Expand",
  "esri/widgets/Home",
  "esri/widgets/Bookmarks",
  "esri/webmap/Bookmark"
], function(
  Map,
  MapView,
  FeatureLayer,
  SimpleRenderer,
  locationRendererCreator,
  SizeVariable,
  Expand,
  Home,
  Bookmarks,
  Bookmark
) {

  const renderer = new SimpleRenderer({
    symbol: {
      type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
      color: "dodgerblue",
      outline: {
        color: [255, 255, 255, 0.7],
        width: 0.5
      },
      size: "3px"
    }
  });

  const layer = new FeatureLayer({
    portalItem: {
      id: "cb1886ff0a9d4156ba4d2fadd7e8a139"
    },
    renderer: renderer
  });

  const baseLayer = new FeatureLayer({
    portalItem: {
      id: "2b93b06dc0dc4e809d3c8db5cb96ba69"
    },
    legendEnabled: false,
    popupEnabled: false,
    renderer: {
      type: "simple",
      symbol: {
        type: "simple-fill",
        color: [200, 200, 200, 0.75],
        outline: {
          color: "white",
          width: 0.5
        }
      }
    },
    spatialReference: {
      wkid: 54035
    }
  });

  const map = new Map({
    layers: [baseLayer, layer]
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: {
      x: 0,
      y: 0,
      spatialReference: baseLayer.spatialReference
    },
    scale: 100000000,
    constraints: {
      rotationEnabled: false
    },
    graphics: [
      {
        symbol: {
          type: "simple-fill",
          color: null,
          outline: {
            width: 1,
            color: [200, 200, 200, 0.75]
          }
        },
        geometry: {
          type: "extent",
          xmin: -180,
          xmax: 180,
          ymin: -90,
          ymax: 90,
          spatialReference: { wkid: 4326 }
        }
      }
    ]
  });
  
  view.when(toggleAutoSize);


  view.ui.add(new Expand({
    view: view,
    group: "top-left",
    content: new Bookmarks({
      view: view,
      bookmarks: [
        new Bookmark({
          name: "Worldwide",
          extent: {
            "spatialReference": {
              "wkid": 54035
            },
            "xmin": -15835344.170688342,
            "ymin": -13890652.781305565,
            "xmax": 15835344.170688342,
            "ymax": 13890652.781305565
          }
        }),
        new Bookmark({
          name: "United Kingdom",
          extent: {
            "spatialReference": {
              "wkid": 54035
            },
            "xmin": -1065951.537827555,
            "ymin": 5722452.8511557,
            "xmax": 414723.8356325665,
            "ymax": 7021290.898050545
          }
        })
      ]
    })
  }), "top-left");

  const scaleInfo = document.getElementById("scaleInfo");
  const infoExpand = new Expand({
    content: scaleInfo,
    view: view,
    group: "top-left"
  });

  view.ui.add(infoExpand, "top-left");

  const infoDiv = document.getElementById("infoDiv");
  view.ui.add(infoDiv, "top-right");

  const toggleButton = document.getElementById("toggle-auto-size");
  toggleButton.addEventListener("click", toggleAutoSize);

  const codeElement = document.getElementById("codeDiv");

  const viewScaleElement = document.getElementById("viewScale");
  const sizeElement = document.getElementById("size");

  let scaleWatchHandle;

  function toggleAutoSize() {
    let sizeOptimizationEnabled = false;

    if (toggleButton.innerText === "Enable auto size by scale") {
      toggleButton.innerText = "Disable auto size by scale";
      sizeOptimizationEnabled = true;
    } else {
      toggleButton.innerText = "Enable auto size by scale";
      clearInfoDisplay();
    }

    // generates a new renderer with a scale-dependent
    // size visual variable to vary icon size by scale
    locationRendererCreator
      .createRenderer({
        layer: layer,
        view: view,
        outlineOptimizationEnabled: layer.geometryType === "polygon" && sizeOptimizationEnabled,
        sizeOptimizationEnabled: layer.geometryType !== "polygon" && sizeOptimizationEnabled
      })
      .then(function(rendererResponse) {
        // the renderer contains a size variable with stops
        // mapping icon sizes to scale values
        const renderer = rendererResponse.renderer;
        renderer.symbol.color = "dodgerblue";
        layer.renderer = renderer;

        if(renderer.visualVariables){
          const scaleVVs = getScaleVariables(renderer.visualVariables);
          const scaleVVsStringified = JSON.stringify(scaleVVs, null, 2);

          codeElement.innerHTML = `<pre>${scaleVVsStringified}</pre>`;

          displayScaleAndSizeValues(view.scale);

          scaleWatchHandle = view.watch("scale", displayScaleAndSizeValues);

          function displayScaleAndSizeValues(scale){
            viewScaleElement.innerHTML = Math.round(scale);
            const effectiveSize = getSizeFromScale(scaleVVs[0], scale);
            sizeElement.innerHTML = effectiveSize.toPrecision(2);
          }
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  function getScaleVariables(visualVariables){
    return visualVariables.filter(function(vv){
      return vv.valueExpression && vv.valueExpression === "$view.scale";
    });
  }

  function clearInfoDisplay(){
    sizeElement.innerHTML = null;
    viewScaleElement.innerHTML = null;
    codeElement.innerHTML = null;
    scaleWatchHandle.remove();
    scaleWatchHandle = null;
    infoExpand.expanded = false;
  }

  function getSizeFromScale(sizeVV, scale){
    const sizeStops = sizeVV.stops;
    const stopsCount = sizeStops.length;
    const finalIndex = stopsCount-1;
    const scaleMin = sizeStops[0].value;
    const scaleMax = sizeStops[finalIndex].value;

    if(scale <= scaleMin){
      return sizeStops[0].size;
    }

    if(scale >= scaleMax){
      return sizeStops[finalIndex].size;
    }

    for (let i = 0; i <= finalIndex; i++){
      const currentStop = sizeStops[i];
      const nextStop = sizeStops[i+1];

      if(scale >= currentStop.value && scale < nextStop.value){
        const scaleRange = nextStop.value - currentStop.value;
        const sizeRange  = currentStop.size - nextStop.size;
        const relativePosition = (scale - currentStop.value) / scaleRange;

        const effectiveSize = currentStop.size - (sizeRange * relativePosition);
        return effectiveSize;
      }

    }

  }
});