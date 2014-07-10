define(function (require, exports, module) {var SoundManagerMedia;

SoundManagerMedia = (function() {
  SoundManagerMedia.MEDIA_NONE = 0;

  SoundManagerMedia.MEDIA_STARTING = 1;

  SoundManagerMedia.MEDIA_RUNNING = 2;

  SoundManagerMedia.MEDIA_PAUSED = 3;

  SoundManagerMedia.MEDIA_STOPPED = 4;

  function SoundManagerMedia(url, mediaSuccess, mediaError, mediaStatus) {
    this.url = url;
    this.mediaSuccess = mediaSuccess;
    this.mediaError = mediaError;
    this.mediaStatus = mediaStatus;
    if (window.Media) {
      this.media = new window.Media(this._normalizeUrl(), this.mediaSuccess, this.mediaError, this.mediaStatus);
    } else {
      this.media = new Audio(this.url);
    }
  }

  SoundManagerMedia.prototype._normalizeUrl = function() {
    if (window.deviceIsAndroid) {
      return "/android_asset/" + this.url;
    } else {
      return this.url;
    }
  };

  SoundManagerMedia.prototype.play = function() {
    return this.media.play();
  };

  SoundManagerMedia.prototype.pause = function() {
    return this.media.pause();
  };

  return SoundManagerMedia;

})();

module.exports = SoundManagerMedia;

});
