var getConfig = require('hjs-webpack')

module.exports = getConfig({
  in: 'src/app.js',
  out: 'public',
  port: process.env.PORT || 3000,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        head: '<link rel="stylesheet" href="ol3/ol.css"/><link rel="stylesheet" href="https://storage.googleapis.com/code.getmdl.io/1.0.3/material.indigo-pink.min.css"><script src="https://storage.googleapis.com/code.getmdl.io/1.0.3/material.min.js"></script><link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">',
        html: '<div id="main"/>'
      })
    }
  },
  clearBeforeBuild: '!(ol3|loop.kml)'
})
