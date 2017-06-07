const stringify = require('stringify');

module.exports = {
  errorNotify: true,
  browserifyOpts: {
    transform: [stringify],
  },
  scripts: [
    '../node_modules/jquery/dist/jquery.js',
    '../node_modules/underscore/underscore.js',
    '../node_modules/backbone/backbone.js',
    '../node_modules/backbone.radio/build/backbone.radio.js',
    '../node_modules/backbone.marionette/lib/backbone.marionette.js',
  ],
};
