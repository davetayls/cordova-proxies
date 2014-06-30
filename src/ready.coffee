
  'use strict'

  Q = require 'q'
  $ = require 'jquery'
  splashscreen = require './splashscreen'

  d = Q.defer()

  _deviceReady = ->
    splashscreen.show()
    d.resolve()

  document.addEventListener('deviceready', _deviceReady, false)
  if !window.cordova then $(-> d.resolve())

  exports.whenReady = d.promise

