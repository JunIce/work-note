require.config({
  baseUrl: "scripts",
  paths: {
    esri: "/arcgis_js_api/arcgis_js_v421_api/arcgis_js_api/javascript/4.21/esri",
  },
});

require(["esri/Map", "esri/views/MapView", "esri/Graphic"], function (
  Map,
  MapView,
  Graphic
) {
  "use strict";

  document.getElementById("viewDiv").innerText = "";

  // Loading sample "Intro to graphics":
  // https://developers.arcgis.com/javascript/latest/sample-code/intro-graphics/index.html

  var map = new Map({
    basemap: "hybrid",
  });

  var view = new MapView({
    center: [-80, 35],
    container: "viewDiv",
    map: map,
    zoom: 3,
  });

  /*************************
   * Create a point graphic
   *************************/

  // First create a point geometry (this is the location of the Titanic)
  var point = {
    type: "point", // autocasts as new Point()
    longitude: -49.97,
    latitude: 41.73,
  };

  // Create a symbol for drawing the point
  var markerSymbol = {
    type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
    color: [226, 119, 40],
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 2,
    },
  };

  // Create a graphic and add the geometry and symbol to it
  var pointGraphic = new Graphic({
    geometry: point,
    symbol: markerSymbol,
  });

  /****************************
   * Create a polyline graphic
   ****************************/

  // First create a line geometry (this is the Keystone pipeline)
  var polyline = {
    type: "polyline", // autocasts as new Polyline()
    paths: [
      [-111.3, 52.68],
      [-98, 49.5],
      [-93.94, 29.89],
    ],
  };

  // Create a symbol for drawing the line
  var lineSymbol = {
    type: "simple-line", // autocasts as SimpleLineSymbol()
    color: [226, 119, 40],
    width: 4,
  };

  // Create an object for storing attributes related to the line
  var lineAtt = {
    Name: "Keystone Pipeline",
    Owner: "TransCanada",
    Length: "3,456 km",
  };

  /*******************************************
   * Create a new graphic and add the geometry,
   * symbol, and attributes to it. You may also
   * add a simple PopupTemplate to the graphic.
   * This allows users to view the graphic's
   * attributes when it is clicked.
   ******************************************/
  var polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: lineSymbol,
    attributes: lineAtt,
    popupTemplate: {
      // autocasts as new PopupTemplate()
      title: "{Name}",
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "Name",
            },
            {
              fieldName: "Owner",
            },
            {
              fieldName: "Length",
            },
          ],
        },
      ],
    },
  });

  /***************************
   * Create a polygon graphic
   ***************************/

  // Create a polygon geometry
  var polygon = {
    type: "polygon", // autocasts as new Polygon()
    rings: [
      [-64.78, 32.3],
      [-66.07, 18.45],
      [-80.21, 25.78],
      [-64.78, 32.3],
    ],
  };

  // Create a symbol for rendering the graphic
  var fillSymbol = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [227, 139, 79, 0.8],
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: [255, 255, 255],
      width: 1,
    },
  };

  // Add the geometry and symbol to a new graphic
  var polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: fillSymbol,
  });

  // Add the graphics to the view's graphics layer

  view.graphics.addMany([pointGraphic, polylineGraphic, polygonGraphic]);
});
