/**
 * Keyboard helpers
 *
 * Requires:
 * cordova plugin add com.ionic.keyboard --save
 * http://plugins.cordova.io/#/package/com.ionic.keyboard
 */
/// <reference path="../typings/tsd.d.ts" />

import cordovaProxy = require('./core');

/**
 * Hide the keyboard accessory bar with the next, previous and done buttons.
 *
 * @param hide
 */
export function hideKeyboardAccessoryBar(hide:boolean): void {
  if (!cordovaProxy.isAvailable()) return;
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(hide);
}

/**
 * Close the keyboard if it is open.
 */
export function close(): void {
  if (!cordovaProxy.isAvailable()) return;
  cordova.plugins.Keyboard.close();
}

/**
 * Disable native scrolling, useful if you are using JavaScript to scroll
 *
 * @param disbale
 */
export function disableScroll(disable:boolean): void {
  if (!cordovaProxy.isAvailable()) return;
  cordova.plugins.Keyboard.disableScroll(disable);
}

/**
 * Whether or not the keyboard is currently visible.
 */
export function isVisible(): boolean {
  if (!cordovaProxy.isAvailable()) return;
  return cordova.plugins.Keyboard.isVisible;
}

export interface IKeyboardShowEvent extends Event {
  keyboardHeight:number;
}

export function listenToShow(listener:(e:IKeyboardShowEvent) => void):void {
  window.addEventListener('native.keyboardshow', listener);
}

export function listenToHide(listener:(e:Event) => void):void {
  window.addEventListener('native.keyboardhide', listener);
}

