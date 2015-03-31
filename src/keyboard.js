define(function (require, exports, module) {/**
 * Keyboard helpers
 *
 * Requires:
 * http://plugins.cordova.io/#/package/com.ionic.keyboard
 */
/// <reference path="../typings/tsd.d.ts" />
/**
 * Hide the keyboard accessory bar with the next, previous and done buttons.
 *
 * @param hide
 */
function hideKeyboardAccessoryBar(hide) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(hide);
}
exports.hideKeyboardAccessoryBar = hideKeyboardAccessoryBar;
/**
 * Close the keyboard if it is open.
 */
function close() {
    cordova.plugins.Keyboard.close();
}
exports.close = close;
/**
 * Disable native scrolling, useful if you are using JavaScript to scroll
 *
 * @param disbale
 */
function disableScroll(disable) {
    cordova.plugins.Keyboard.disableScroll(disable);
}
exports.disableScroll = disableScroll;
/**
 * Whether or not the keyboard is currently visible.
 */
function isVisible() {
    return cordova.plugins.Keyboard.isVisible;
}
exports.isVisible = isVisible;
//# sourceMappingURL=keyboard.js.map
});
