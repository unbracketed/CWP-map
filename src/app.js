import ol from 'openlayers'

var projection = ol.proj.get('EPSG:3857');

var vector = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'loop.kml',
    format: new ol.format.KML()
  })
});

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({layer: 'sat'}),
    }),
    vector
  ],
  view: new ol.View({
    center: ol.proj.transform([-117.706799, 34.139004], 'EPSG:4326', 'EPSG:3857'),
    zoom: 14,
    projection
  })
})
