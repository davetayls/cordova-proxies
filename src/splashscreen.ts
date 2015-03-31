/***
 * Splash screen helpers
 *
 * Requires:
 * http://plugins.cordova.io/#/package/org.apache.cordova.splashscreen
 */
/// <reference path="../typings/tsd.d.ts" />

export function show() {
  if (navigator.splashscreen) {
    return navigator.splashscreen.show();
  }
}

export function hide() {
  if (navigator.splashscreen) {
    return navigator.splashscreen.hide();
  }
}

