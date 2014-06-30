define(function (require, exports, module) {'use strict';
var BrowserRequest, Events, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = require('underscore');

Events = require('backbone').Events;

BrowserRequest = (function() {
  function BrowserRequest(url) {
    this.url = url;
    this.show = __bind(this.show, this);
    this.close = __bind(this.close, this);
    this.open = __bind(this.open, this);
    this._onExit = __bind(this._onExit, this);
    this._onPostMessage = __bind(this._onPostMessage, this);
    this._onLoadError = __bind(this._onLoadError, this);
    this._onLoadStop = __bind(this._onLoadStop, this);
    this._onLoadStart = __bind(this._onLoadStart, this);
    this._addWindowEvents = __bind(this._addWindowEvents, this);
    _.extend(this, Events);
  }

  BrowserRequest.prototype.url = '';

  BrowserRequest.prototype.windowOptions = ['toolbarposition=top', 'hidden=yes', 'location=no', 'closebuttoncaption=Close', 'toolbar=yes'];

  BrowserRequest.prototype.openDelay = 1000;

  BrowserRequest.prototype._addWindowEvents = function() {
    if (this.window && this.window.addEventListener) {
      this.window.addEventListener('loadstart', this._onLoadStart);
      this.window.addEventListener('loaderror', this._onLoadError);
      this.window.addEventListener('loadstop', this._onLoadStop);
      this.window.addEventListener('exit', this._onExit);
      return window.addEventListener('message', this._onPostMessage);
    }
  };

  BrowserRequest.prototype._onLoadStart = function(e) {
    this.trigger('load:start', e);
    return this.trigger('load:progress', e);
  };

  BrowserRequest.prototype._onLoadStop = function(e) {
    return this.trigger('load:stop', e);
  };

  BrowserRequest.prototype._onLoadError = function(e) {
    if (e.code === -999) {
      return this.trigger('load:cancelled', e);
    } else {
      return this.trigger('load:error', e);
    }
  };

  BrowserRequest.prototype._onPostMessage = function(e) {
    if (e.source === this.window) {
      return this.trigger('load:progress', e.data);
    }
  };

  BrowserRequest.prototype._onExit = function(e) {
    return this.trigger('exit');
  };

  BrowserRequest.prototype.open = function(url) {
    if (url == null) {
      url = this.url;
    }
    this.window = window.open(url, '_blank', this.windowOptions.join(','));
    this._addWindowEvents();
    if (!/hidden|onload/.test(this.openDelay)) {
      return this.windowShowTimeout = setTimeout(this.show, this.openDelay);
    }
  };

  BrowserRequest.prototype.close = function() {
    if (this.window) {
      clearTimeout(this.windowShowTimeout);
      window.removeEventListener('message', this._onPostMessage);
      try {
        return this.window.close();
      } finally {
        this.window = null;
      }
    }
  };

  BrowserRequest.prototype.show = function() {
    if (this.window && this.window.show) {
      this.window.show();
      return this.trigger('show');
    }
  };

  return BrowserRequest;

})();

exports.Request = BrowserRequest;

});
