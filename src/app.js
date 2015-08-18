import ol from 'openlayers'

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.MapQuest({layer: 'sat'})
    })
  ],
  view: new ol.View({
    center: ol.proj.transform([-117.7197, 34.1100], 'EPSG:4326', 'EPSG:3857'),
    zoom: 4
  })
})
