define(function (require, exports, module) {var MediaProxy, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = require('underscore');

MediaProxy = (function() {
  MediaProxy.MEDIA_NONE = 0;

  MediaProxy.MEDIA_STARTING = 1;

  MediaProxy.MEDIA_RUNNING = 2;

  MediaProxy.MEDIA_PAUSED = 3;

  MediaProxy.MEDIA_STOPPED = 4;

  function MediaProxy(url, mediaSuccess, mediaError, mediaStatus) {
    this.url = url;
    this.mediaSuccess = mediaSuccess;
    this.mediaError = mediaError;
    this.mediaStatus = mediaStatus;
    this._statusChange = __bind(this._statusChange, this);
    if (window.Media) {
      this.media = new window.Media(this._normalizeUrl(), this.mediaSuccess, this.mediaError, this._statusChange);
    } else {
      this.media = new Audio(this.url);
    }
  }

  MediaProxy.prototype._normalizeUrl = function() {
    if (window.deviceIsAndroid) {
      return "/android_asset/" + this.url;
    } else {
      return this.url;
    }
  };

  MediaProxy.prototype._statusChange = function(status) {
    this.currentStatus = status;
    console.log('Media status', status);
    _.result(this.mediaStatus);
  };

  MediaProxy.prototype.play = function() {
    return this.media.play();
  };

  MediaProxy.prototype.pause = function() {
    return this.media.pause();
  };

  MediaProxy.prototype.stop = function() {
    if (this.currentStatus !== MediaProxy.MEDIA_STOPPED) {
      console.log('Stopping media');
      return this.media.stop();
    }
  };

  MediaProxy.prototype.release = function() {
    return this.media.release();
  };

  return MediaProxy;

})();

module.exports = MediaProxy;

});
