define(function (require, exports, module) {/// <reference path="../typings/tsd.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _ = require('underscore');
var EventedClass = require('./EventedClass');
var core = require('./core');
var ready = require('./ready');
ready.whenReady.done(function () {
    if (core.isAvailable())
        window.open = cordova.InAppBrowser.open;
});
var BrowserRequest = (function (_super) {
    __extends(BrowserRequest, _super);
    function BrowserRequest(url) {
        _super.call(this);
        this.windowOptions = ['toolbarposition=top', 'hidden=yes', 'location=no', 'closebuttoncaption=Close', 'toolbar=yes'];
        this.openDelay = 1000;
        this.url = url;
        this.show = _.bind(this.show, this);
        this.close = _.bind(this.close, this);
        this.open = _.bind(this.open, this);
        this._onPostMessage = _.bind(this._onPostMessage, this);
        this._addWindowEvents = _.bind(this._addWindowEvents, this);
        this._onLoadStart = _.bind(this._onLoadStart, this);
        this._onLoadError = _.bind(this._onLoadError, this);
        this._onLoadStop = _.bind(this._onLoadStop, this);
        this._onExit = _.bind(this._onExit, this);
    }
    BrowserRequest.prototype._addWindowEvents = function () {
        if (this.window && this.window.addEventListener) {
            this.window.addEventListener('loadstart', this._onLoadStart);
            this.window.addEventListener('loaderror', this._onLoadError);
            this.window.addEventListener('loadstop', this._onLoadStop);
            this.window.addEventListener('exit', this._onExit);
            this.window.addEventListener('unload', this._onExit);
            return window.addEventListener('message', this._onPostMessage);
        }
    };
    BrowserRequest.prototype.removeWindowEvents = function () {
        this.window.removeEventListener('loadstart', this._onLoadStart);
        this.window.removeEventListener('loaderror', this._onLoadError);
        this.window.removeEventListener('loadstop', this._onLoadStop);
        this.window.removeEventListener('exit', this._onExit);
        this.window.removeEventListener('unload', this._onExit);
    };
    BrowserRequest.prototype._onLoadStart = function (e) {
        this.trigger('load:start', e);
        return this.trigger('load:progress', e);
    };
    BrowserRequest.prototype._onLoadStop = function (e) {
        return this.trigger('load:stop', e);
    };
    BrowserRequest.prototype._onLoadError = function (e) {
        if (e.code === -999) {
            return this.trigger('load:cancelled', e);
        }
        else {
            return this.trigger('load:error', e);
        }
    };
    BrowserRequest.prototype._onPostMessage = function (e) {
        if (e.source === this.window) {
            return this.trigger('load:progress', e.data);
        }
    };
    BrowserRequest.prototype._onExit = function (e) {
        return this.trigger('exit');
    };
    BrowserRequest.prototype.open = function (url) {
        if (url === void 0) { url = this.url; }
        this.window = window.open(url, '_blank', this.windowOptions.join(','));
        this._addWindowEvents();
        if (this.openDelay === 0) {
            this.show();
        }
        else if (this.openDelay > 0) {
            return this.windowShowTimeout = setTimeout(this.show, this.openDelay);
        }
    };
    BrowserRequest.prototype.close = function () {
        if (this.window) {
            clearTimeout(this.windowShowTimeout);
            window.removeEventListener('message', this._onPostMessage);
            this.removeWindowEvents();
            try {
                return this.window.close();
            }
            finally {
                this.window = null;
            }
        }
    };
    BrowserRequest.prototype.show = function () {
        if (this.window && this.window.show) {
            this.window.show();
            return this.trigger('show');
        }
    };
    return BrowserRequest;
})(EventedClass.EventedClass);
exports.BrowserRequest = BrowserRequest;

});
