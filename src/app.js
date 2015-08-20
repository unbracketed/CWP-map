import ol from 'openlayers'
import React from 'react'


// size the map container
//const mapElem = document.querySelector('#map')
//mapElem.setAttribute('style', `width:600px;height:${window.innerHeight}px`)

const initMap = function () {

  const projection = ol.proj.get('EPSG:3857')
  const loopSource = new ol.source.Vector({
      url: 'loop.kml',
      format: new ol.format.KML()
  })
  const vector = new ol.layer.Vector({source: loopSource})

  const view = new ol.View({
    center: ol.proj.transform([-117.706799, 34.139004], 'EPSG:4326', 'EPSG:3857'),
    zoom: 15,
    projection
  })

  const map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vector
    ],
    view
  })

  // Center map to the trail once it has been loaded
  loopSource.on('addfeature', event => {
    console.log('ext', event.feature.getGeometry().getExtent())
    view.setCenter(ol.extent.getCenter(event.feature.getGeometry().getExtent()))
  })

}

class Layout {

  componentDidMount () {
      initMap()
  }

  render () {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col" id="map"></div>
        <div className="mdl-cell mdl-cell--8-col">Claremont Wilderness Park</div>
      </div>
    )
  }
}

React.render(<Layout/>, document.querySelector('#main'))
