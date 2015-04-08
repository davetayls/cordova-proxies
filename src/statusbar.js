/**
 * Status bar helpers
 *
 * This requires the following cordova plugins:
 * http://plugins.cordova.io/#/package/org.apache.cordova.device
 */
/// <reference path="../typings/tsd.d.ts" />
var Modernizr = require('modernizr');
var deviceProxy = require('./device');
function deviceReady() {
    var ios7 = false;
    if (deviceProxy.isIOS()) {
        ios7 = parseFloat(device.version) > 7;
    }
    Modernizr.addTest('ios7', ios7);
}
document.addEventListener('deviceready', deviceReady, false);
