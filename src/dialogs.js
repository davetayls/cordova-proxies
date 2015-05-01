/**
 * Dialogs helpers
 *
 * Requires:
 * cordova plugin add cordova-plugin-dialogs --save
 */
/// <reference path="../typings/tsd.d.ts" />
function alert(message, cb, title, buttonName) {
    if (navigator.notification) {
        navigator.notification.alert(message, cb, title, buttonName);
    }
    else {
        window.alert(message || title);
        cb();
    }
}
exports.alert = alert;
function confirm(message, confirmCallback, title, buttonLabels) {
    if (navigator.notification) {
        navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
    }
    else {
        var result = window.confirm(message || title);
        if (result) {
            confirmCallback(1);
        }
        else {
            confirmCallback(2);
        }
    }
}
exports.confirm = confirm;
