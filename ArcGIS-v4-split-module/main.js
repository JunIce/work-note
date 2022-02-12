var loc = location.pathname.replace(/\/[^/]+$/, '');
require({
  packages: [
    { name: "modules", location: loc + "modules"}
  ]
},[
  "esri/Map",
  "esri/views/MapView",
  "modules/MySearchWidget",
  "modules/config",
  "dojo/ready"
], function(
  Map,
  MapView,
  MySearchWidget,
  config
) {
  var map = new Map({
    basemap: config.basemap
  });

  var view = new MapView({
    container: config.viewDiv,
    map: map,
    center: [-118.80500, 34.02700], // longitude, latitude
    zoom: 13
  });
  
  var widget = MySearchWidget(view);
  console.log(widget)
});