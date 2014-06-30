  'use strict'

  exports.show = ->
    if navigator.splashscreen
      navigator.splashscreen.show()

  exports.hide = ->
    if navigator.splashscreen
      navigator.splashscreen.hide()

