import ol from 'openlayers'
import React from 'react'
import defaultStyles from './styles.css'



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
        source: new ol.source.MapQuest({layer: 'sat'})
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

var Header = React.createClass({
  render: function() {
    return (

      <div className="demo-layout-transparent mdl-layout mdl-js-layout">
        <header className="mdl-layout__header mdl-layout__header--transparent">
          <div className="mdl-layout__header-row">
            {/* Title */}
            <span className="mdl-layout-title">Claremont Hills Wilderness Park</span>
            {/* Add spacer, to align navigation to the right */}
            <div className="mdl-layout-spacer" />
            {/* Navigation */}
            <nav className="mdl-navigation">
              <a className="mdl-navigation__link" href>Link</a>
              <a className="mdl-navigation__link" href>Link</a>
              <a className="mdl-navigation__link" href>Link</a>
              <a className="mdl-navigation__link" href>Link</a>
            </nav>
          </div>
        </header>
        <div className="mdl-layout__drawer">
          <span className="mdl-layout-title">CHWP</span>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href>Trail Highlights</a>
            <a className="mdl-navigation__link" href>Burbank Canyon</a>
            <a className="mdl-navigation__link" href>Cobal Canyon</a>
            <a className="mdl-navigation__link" href>Weather & Sun</a>
            <a className="mdl-navigation__link" href>Wildlife</a>
          </nav>
        </div>
        <main className="mdl-layout__content">
        </main>
      </div>
    );
  }
});

class Layout {

  componentDidMount () {
      // size the map container
      const mapElem = document.querySelector('#map')
      mapElem.setAttribute('style', `width:${mapElem.style.width - 20}px;height:${window.innerHeight}px`)
      initMap()
  }

  render () {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--4-col" id="map"></div>
        <div className="mdl-cell mdl-cell--8-col">
          <div className="mdl-typography--display-2">Claremont Hills Wilderness Park</div>
        </div>
      </div>
    )
  }
}

React.render(<Layout/>, document.querySelector('#main'))
