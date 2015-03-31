/**
 * Status bar helpers
 *
 * This requires the following cordova plugins:
 * http://plugins.cordova.io/#/package/org.apache.cordova.device
 */
/// <reference path="../typings/tsd.d.ts" />

import Modernizr = require('modernizr');
import deviceProxy = require('./device');

function deviceReady():void {
  var ios7 = false;
  if (deviceProxy.isIOS()) {
    ios7 = parseFloat(device.version) > 7;
  }
  Modernizr.addTest('ios7', ios7);
}

document.addEventListener('deviceready', deviceReady, false);


