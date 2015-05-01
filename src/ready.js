/// <reference path="../typings/tsd.d.ts" />
var $ = require('jquery');
var splashscreen = require('./splashscreen');
var d = $.Deferred();
function _deviceReady() {
    splashscreen.show();
    d.resolve();
}
document.addEventListener('deviceready', _deviceReady, false);
if (typeof cordova === 'undefined') {
    $(d.resolve);
}
exports.whenReady = d.promise();
