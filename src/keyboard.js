define(function (require, exports, module) {/**
 * Keyboard helpers
 *
 * Requires:
 * cordova plugin add com.ionic.keyboard --save
 * http://plugins.cordova.io/#/package/com.ionic.keyboard
 */
/// <reference path="../typings/tsd.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var $ = require('jquery');
var cordovaProxy = require('./core');
var ready = require('./ready');
var EventedClass = require('./EventedClass');
ready.whenReady.done(function () {
    disableScroll(true);
});
exports.CHANGED_EVENT = 'changed';
var KeyboardState = (function (_super) {
    __extends(KeyboardState, _super);
    function KeyboardState() {
        this.keyboardIsOpen = false;
        this.keyboardHeight = null;
        this.focusedElement = null;
        _super.call(this);
    }
    KeyboardState.prototype.toJSON = function () {
        return {
            keyboardIsOpen: this.keyboardIsOpen,
            keyboardHeight: this.keyboardHeight
        };
    };
    return KeyboardState;
})(EventedClass.EventedClass);
exports.KeyboardState = KeyboardState;
exports.currentState = new KeyboardState();
exports.activeEl;
var inputs = [
    'input',
    'select',
    'textarea',
];
$(document).on('mousedown touchstart', inputs.join(','), function (e) {
    exports.activeEl = this;
});
/**
 * Hide the keyboard accessory bar with the next, previous and done buttons.
 *
 * @param hide
 */
function hideKeyboardAccessoryBar(hide) {
    if (!cordovaProxy.isAvailable())
        return;
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(hide);
}
exports.hideKeyboardAccessoryBar = hideKeyboardAccessoryBar;
/**
 * Close the keyboard if it is open.
 */
function close() {
    if (!cordovaProxy.isAvailable())
        return;
    cordova.plugins.Keyboard.close();
}
exports.close = close;
/**
 * Disable native scrolling, useful if you are using JavaScript to scroll
 *
 * @param disbale
 */
function disableScroll(disable) {
    if (!cordovaProxy.isAvailable())
        return;
    cordova.plugins.Keyboard.disableScroll(disable);
}
exports.disableScroll = disableScroll;
/**
 * Whether or not the keyboard is currently visible.
 */
function isVisible() {
    if (!cordovaProxy.isAvailable())
        return;
    return cordova.plugins.Keyboard.isVisible;
}
exports.isVisible = isVisible;
function listenToShow(listener) {
    window.addEventListener('native.keyboardshow', listener);
}
exports.listenToShow = listenToShow;
function listenToHide(listener) {
    window.addEventListener('native.keyboardhide', listener);
}
exports.listenToHide = listenToHide;
function listenToChanged(listener) {
    exports.currentState.on(exports.CHANGED_EVENT, listener);
}
exports.listenToChanged = listenToChanged;
function stopListeningToChanged(listener) {
    exports.currentState.off(exports.CHANGED_EVENT, listener);
}
exports.stopListeningToChanged = stopListeningToChanged;
window.addEventListener('native.keyboardshow', function (e) {
    exports.currentState.keyboardIsOpen = true;
    exports.currentState.keyboardHeight = e.keyboardHeight;
    if (exports.currentState.focusedElement) {
        if (exports.currentState.focusedElement[0] !== exports.activeEl) {
            exports.currentState.focusedElement = $(exports.activeEl);
        }
    }
    else {
        exports.currentState.focusedElement = $(exports.activeEl);
    }
    exports.currentState.trigger(exports.CHANGED_EVENT, exports.currentState);
});
window.addEventListener('native.keyboardhide', function () {
    if (!exports.currentState.keyboardIsOpen)
        return;
    exports.currentState.keyboardIsOpen = false;
    exports.currentState.keyboardHeight = null;
    exports.currentState.focusedElement = null;
    exports.currentState.trigger(exports.CHANGED_EVENT, exports.currentState);
});

});
