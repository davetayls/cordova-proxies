define(function (require, exports, module) {/// <reference path="../typings/tsd.d.ts" />
function isAvailable() {
    return typeof cordova !== 'undefined';
}
exports.isAvailable = isAvailable;

});
