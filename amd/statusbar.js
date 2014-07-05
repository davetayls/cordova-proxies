define(function (require, exports, module) {'use strict';
var _deviceReady;

_deviceReady = function() {
  var ios7;
  ios7 = false;
  if (window.device && window.deviceIsIOS) {
    ios7 = parseFloat(window.device.version) > 7;
  }
  return Modernizr.addTest('ios7', ios7);
};

document.addEventListener('deviceready', _deviceReady, false);

});
