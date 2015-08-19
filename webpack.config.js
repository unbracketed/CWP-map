var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  port: process.env.PORT || 3000,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        head: '<link rel="stylesheet" href="ol3/ol.css"/>',
        html: '<div id="map" style="width: 600px"/>'
      })
    }
  },
  clearBeforeBuild: '!(ol3|loop.kml)'
})
