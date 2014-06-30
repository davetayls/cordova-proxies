define(function (require, exports, module) {'use strict';
var $, Q, d, splashscreen, _deviceReady;

Q = require('q');

$ = require('jquery');

splashscreen = require('./splashscreen');

d = Q.defer();

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

exports.whenReady = d.promise;

});
