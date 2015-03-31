define(function (require, exports, module) {/***
 * Splash screen helpers
 *
 * Requires:
 * http://plugins.cordova.io/#/package/org.apache.cordova.splashscreen
 */
/// <reference path="../typings/tsd.d.ts" />
function show() {
    if (navigator.splashscreen) {
        return navigator.splashscreen.show();
    }
}
exports.show = show;
function hide() {
    if (navigator.splashscreen) {
        return navigator.splashscreen.hide();
    }
}
exports.hide = hide;
//# sourceMappingURL=splashscreen.js.map
});
