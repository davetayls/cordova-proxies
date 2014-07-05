
  'use strict'

  _deviceReady = ->
    ios7 = false
    if window.device and window.deviceIsIOS
      ios7 = parseFloat(window.device.version) > 7
    Modernizr.addTest 'ios7', ios7

  document.addEventListener('deviceready', _deviceReady, false)

  #    if window.StatusBar
  #      StatusBar.overlaysWebView(false)
  #      StatusBar.styleBlackOpaque();

