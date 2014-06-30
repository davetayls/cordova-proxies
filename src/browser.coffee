  'use strict'

  _ = require 'underscore'
  Events = require('backbone').Events

  class BrowserRequest
    constructor: (@url) ->
      _.extend @, Events
    url: ''
    windowOptions: [
      'toolbarposition=top'
      'hidden=yes'
      'location=no'
      'closebuttoncaption=Close'
      'toolbar=yes'
    ]
    # Specify how long before the window opens
    # This can either be
    #  - a number of milliseconds
    #  - 'hidden' to not automatically open
    #  - TODO 'onload' to show once loadstop fires
    openDelay: 1000

    # private methods

    _addWindowEvents: =>
      if @window and @window.addEventListener
        @window.addEventListener 'loadstart', @_onLoadStart
        @window.addEventListener 'loaderror', @_onLoadError
        @window.addEventListener 'loadstop', @_onLoadStop
        @window.addEventListener 'exit', @_onExit

        # use postmessage api to listen for non-cordova window
        # messages
        window.addEventListener 'message', @_onPostMessage

    _onLoadStart: (e) =>
      @trigger 'load:start', e
      @trigger 'load:progress', e
    _onLoadStop: (e) => @trigger 'load:stop', e
    _onLoadError: (e) =>
      if e.code is -999
        @trigger 'load:cancelled', e
      else
        @trigger 'load:error', e
    _onPostMessage: (e) =>
      if e.source is @window
        @trigger 'load:progress', e.data

    _onExit: (e) => @trigger 'exit'

    # public methods

    open: (url = @url) =>
      @window = window.open url, '_blank', @windowOptions.join(',')
      @_addWindowEvents()
      unless /hidden|onload/.test(@openDelay)
        @windowShowTimeout = setTimeout @show, @openDelay

    close: =>
      if @window
        clearTimeout @windowShowTimeout
        window.removeEventListener('message', @_onPostMessage)
        try
          @window.close()
        finally
          @window = null

    show: =>
      if @window and @window.show
        @window.show()
        @trigger 'show'




  exports.Request = BrowserRequest

