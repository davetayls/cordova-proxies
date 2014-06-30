define(function (require, exports, module) {'use strict';
var $, d, splashscreen, _deviceReady;

$ = require('jquery');

splashscreen = require('./splashscreen');

d = $.Deferred();

_deviceReady = function() {
  splashscreen.show();
  return d.resolve();
};

document.addEventListener('deviceready', _deviceReady, false);

if (!window.cordova) {
  $(function() {
    return d.resolve();
  });
}

exports.whenReady = d.promise();

});
