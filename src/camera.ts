///<reference path="../typings/tsd.d.ts"/>

/**
 * Camera Helpers
 * https://github.com/apache/cordova-plugin-camera
 */

import core = require('./core');

var nav:any = navigator;
nav.getUserMedia = nav.getUserMedia ||
  nav.webkitGetUserMedia ||
  nav.mozGetUserMedia;

export function isAvailable():boolean {
  return core.isAvailable() && !!navigator.camera;
}

export function getPicture(success:(url:string)=>void,
                           error:(errString:string)=>void,
                           options:CameraOptions):void {
  if (isAvailable()) {
    navigator.camera.getPicture(success, error, options)
  }
}

export function getVideoMediaStream(width:number, height:number):HTMLVideoElement {
  var video = document.createElement('video');
  if (nav.getUserMedia) {
    var options = {
      audio: true,
      video: {
        width: width,
        height: height
      }
    };
    nav.getUserMedia(options,
      function(stream:any) {
        video.src = URL.createObjectURL(stream);
        video.onloadedmetadata = function(e) {
          video.play();
        };
      },
      function(err:any) {
        console.log("The following error occured: " + err.name);
      }
    );
  } else {
    console.log("getUserMedia not supported");
  }
  return video;
}
