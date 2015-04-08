/// <reference path="../typings/tsd.d.ts" />
var deviceProxy = require('./device');
var MediaProxy = (function () {
    function MediaProxy(url, mediaSuccess, mediaError, mediaStatus) {
        this.url = url;
        this.mediaSuccess = mediaSuccess;
        this.mediaError = mediaError;
        this.mediaStatus = mediaStatus;
        if (Media) {
            this.media = new Media(this.normalizeUrl(), this.mediaSuccess, this.mediaError, this.statusChange.bind(this));
        }
        else {
            this.audio = new Audio(this.url);
            this.media = this.audio;
        }
    }
    MediaProxy.prototype.normalizeUrl = function () {
        if (deviceProxy.isAndroid()) {
            return "/android_asset/" + this.url;
        }
        else {
            return this.url;
        }
    };
    MediaProxy.prototype.statusChange = function (status) {
        this.currentStatus = status;
        console.log('Media status', status);
        this.mediaStatus(status);
    };
    MediaProxy.prototype.play = function () {
        this.media.play();
    };
    MediaProxy.prototype.pause = function () {
        this.media.pause();
    };
    MediaProxy.prototype.stop = function () {
        if (this.currentStatus !== MediaProxy.MEDIA_STOPPED) {
            console.log('Stopping media');
            if (this.media.stop) {
                this.media.stop();
            }
            else if (this.audio) {
                this.pause();
                this.audio.currentTime = 0;
            }
        }
    };
    MediaProxy.prototype.release = function () {
        if (this.media.release)
            this.media.release();
    };
    MediaProxy.MEDIA_NONE = 0;
    MediaProxy.MEDIA_STARTING = 1;
    MediaProxy.MEDIA_RUNNING = 2;
    MediaProxy.MEDIA_PAUSED = 3;
    MediaProxy.MEDIA_STOPPED = 4;
    return MediaProxy;
})();
exports.MediaProxy = MediaProxy;
