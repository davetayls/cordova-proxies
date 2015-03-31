/// <reference path="../typings/tsd.d.ts" />

import _ = require('underscore');
import deviceProxy = require('./device');

export interface IMediaPlayable {
  play:() => any;
  pause:() => any;
  stop?: () => any;
  release?:() => any;
}

export class MediaProxy {

  static MEDIA_NONE = 0;
  static MEDIA_STARTING = 1;
  static MEDIA_RUNNING = 2;
  static MEDIA_PAUSED = 3;
  static MEDIA_STOPPED = 4;

  constructor(url:string,
              mediaSuccess:() => void,
              mediaError:(error:MediaError) => any,
              mediaStatus:(status:number) => void) {
    this.url = url;
    this.mediaSuccess = mediaSuccess;
    this.mediaError = mediaError;
    this.mediaStatus = mediaStatus;
    if (Media) {
      this.media = new Media(
        this.normalizeUrl(),
        this.mediaSuccess,
        this.mediaError,
        this.statusChange.bind(this)
      );
    } else {
      this.audio = new Audio(this.url);
      this.media = this.audio;
    }
  }

  media:IMediaPlayable;
  audio:HTMLAudioElement;
  url:string;
  mediaSuccess:() => void;
  mediaError:(error:MediaError) => any;
  mediaStatus:(status:number) => void;
  currentStatus:number;

  protected normalizeUrl() {
    if (deviceProxy.isAndroid()) {
      return "/android_asset/" + this.url;
    } else {
      return this.url;
    }
  }

  protected statusChange(status:number) {
    this.currentStatus = status;
    console.log('Media status', status);
    this.mediaStatus(status);
  }

  play():void {
    this.media.play();
  }

  pause():void {
    this.media.pause();
  }

  stop():void {
    if (this.currentStatus !== MediaProxy.MEDIA_STOPPED) {
      console.log('Stopping media');
      if (this.media.stop) {
        this.media.stop();
      } else if (this.audio) {
        this.pause();
        this.audio.currentTime = 0;
      }
    }
  }

  release():void {
    if (this.media.release) this.media.release();
  }

}

