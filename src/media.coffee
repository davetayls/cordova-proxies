
_ = require 'underscore'

class MediaProxy
  @MEDIA_NONE: 0
  @MEDIA_STARTING: 1
  @MEDIA_RUNNING: 2
  @MEDIA_PAUSED: 3
  @MEDIA_STOPPED: 4

  constructor: (@url, @mediaSuccess, @mediaError, @mediaStatus) ->
    if window.Media
      @media = new window.Media(@_normalizeUrl(), @mediaSuccess, @mediaError, @_statusChange)
    else
      @media = new Audio(@url)

  _normalizeUrl: ->
    if window.deviceIsAndroid
      "/android_asset/#{@url}"
    else @url

  _statusChange: (status) =>
    @currentStatus = status
    console.log 'Media status', status
    _.result(@mediaStatus)
    return

  play: -> @media.play()

  pause: -> @media.pause()

  stop: ->
    unless @currentStatus is MediaProxy.MEDIA_STOPPED
      console.log 'Stopping media'
      @media.stop()

  release: -> @media.release()

module.exports = MediaProxy
