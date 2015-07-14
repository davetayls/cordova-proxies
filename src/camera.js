define(function (require, exports, module) {///<reference path="../typings/tsd.d.ts"/>
/**
 * Camera Helpers
 * https://github.com/apache/cordova-plugin-camera
 */
var core = require('./core');
var nav = navigator;
nav.getUserMedia = nav.getUserMedia || nav.webkitGetUserMedia || nav.mozGetUserMedia;
function isAvailable() {
    return core.isAvailable() && !!navigator.camera;
}
exports.isAvailable = isAvailable;
function getPicture(success, error, options) {
    if (isAvailable()) {
        navigator.camera.getPicture(success, error, options);
    }
}
exports.getPicture = getPicture;
function getVideoMediaStream(width, height) {
    var video = document.createElement('video');
    if (nav.getUserMedia) {
        var options = {
            audio: true,
            video: {
                width: width,
                height: height
            }
        };
        nav.getUserMedia(options, function (stream) {
            video.src = URL.createObjectURL(stream);
            video.onloadedmetadata = function (e) {
                video.play();
            };
        }, function (err) {
            console.log("The following error occured: " + err.name);
        });
    }
    else {
        console.log("getUserMedia not supported");
    }
    return video;
}
exports.getVideoMediaStream = getVideoMediaStream;

});
