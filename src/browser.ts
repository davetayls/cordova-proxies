/// <reference path="../typings/tsd.d.ts" />

import _ = require('underscore');
import EventedClass = require('./EventedClass');

export interface IRequestWindow extends Window {
  show():void;
}

export interface IPostMessageEvent extends Event {
  data:any;
  origin:string;
  source:Window;
}

export class BrowserRequest extends EventedClass.EventedClass {
  constructor(url:string) {
    super();
    this.windowOptions = ['toolbarposition=top', 'hidden=yes', 'location=no', 'closebuttoncaption=Close', 'toolbar=yes'];
    this.openDelay = 1000;
    this.url = url;
    this.show = _.bind(this.show, this);
    this.close = _.bind(this.close, this);
    this.open = _.bind(this.open, this);
    this._onPostMessage = _.bind(this._onPostMessage, this);
    this._addWindowEvents = _.bind(this._addWindowEvents, this);
  }

  url:string;
  windowOptions:string[];
  openDelay:number;
  window:IRequestWindow;
  windowShowTimeout:number;

  _addWindowEvents() {
    if (this.window && this.window.addEventListener) {
      this.window.addEventListener('loadstart', this._onLoadStart.bind(this));
      this.window.addEventListener('loaderror', this._onLoadError.bind(this));
      this.window.addEventListener('loadstop', this._onLoadStop.bind(this));
      this.window.addEventListener('exit', this._onExit.bind(this));
      return window.addEventListener('message', this._onPostMessage);
    }
  }

  _onLoadStart(e:InAppBrowserEvent) {
    this.trigger('load:start', e);
    return this.trigger('load:progress', e);
  }

  _onLoadStop(e:InAppBrowserEvent) {
    return this.trigger('load:stop', e);
  }

  _onLoadError(e:InAppBrowserEvent) {
    if (e.code === -999) {
      return this.trigger('load:cancelled', e);
    } else {
      return this.trigger('load:error', e);
    }
  }

  _onPostMessage(e:IPostMessageEvent) {
    if (e.source === this.window) {
      return this.trigger('load:progress', e.data);
    }
  }

  _onExit(e:InAppBrowserEvent) {
    return this.trigger('exit');
  }

  open(url:string = this.url) {
    this.window = window.open(url, '_blank', this.windowOptions.join(','));
    this._addWindowEvents();
    if (this.openDelay === 0) {
      this.show();
    } else if (this.openDelay > 0) {
      return this.windowShowTimeout = setTimeout(this.show, this.openDelay);
    }
  }

  close() {
    if (this.window) {
      clearTimeout(this.windowShowTimeout);
      window.removeEventListener('message', this._onPostMessage);
      try {
        return this.window.close();
      } finally {
        this.window = null;
      }
    }
  }

  show() {
    if (this.window && this.window.show) {
      this.window.show();
      return this.trigger('show');
    }
  }

}


