/// <reference path="../typings/tsd.d.ts" />

import $ = require('jquery');
import splashscreen = require('./splashscreen');

var d = $.Deferred();

function _deviceReady() {
  splashscreen.show();
  d.resolve();
}

document.addEventListener('deviceready', _deviceReady, false);

if (typeof cordova === 'undefined') {
  $(d.resolve);
}

export var whenReady = d.promise();

