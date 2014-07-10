

class SoundManagerMedia
  @MEDIA_NONE: 0
  @MEDIA_STARTING: 1
  @MEDIA_RUNNING: 2
  @MEDIA_PAUSED: 3
  @MEDIA_STOPPED: 4

  constructor: (@url, @mediaSuccess, @mediaError, @mediaStatus) ->
    if window.Media
      @media = new window.Media(@_normalizeUrl(), @mediaSuccess, @mediaError, @mediaStatus)
    else
      @media = new Audio(@url)

  _normalizeUrl: ->
    if window.deviceIsAndroid
      "/android_asset/#{@url}"
    else @url

  play: -> @media.play()

  pause: -> @media.pause()

module.exports = SoundManagerMedia
