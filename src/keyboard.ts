/**
 * Keyboard helpers
 *
 * Requires:
 * cordova plugin add com.ionic.keyboard --save
 * http://plugins.cordova.io/#/package/com.ionic.keyboard
 */
/// <reference path="../typings/tsd.d.ts" />

import $ = require('jquery');
import cordovaProxy = require('./core');
import ready = require('./ready');
import EventedClass = require('./EventedClass');

ready.whenReady.done(function() {
  disableScroll(true);
});

export var CHANGED_EVENT = 'changed';

export class KeyboardState extends EventedClass.EventedClass {
  constructor() {
    this.keyboardIsOpen = false;
    this.keyboardHeight = null;
    this.focusedElement = null;
    super();
  }
  keyboardIsOpen:boolean;
  keyboardHeight:number;
  focusedElement:JQuery;

  toJSON() {
    return {
      keyboardIsOpen: this.keyboardIsOpen,
      keyboardHeight: this.keyboardHeight
    }
  }
}

export var currentState = new KeyboardState();

export var activeEl:Element;
var inputs = [
  'input',
  'select',
  'textarea',
];
$(document).on('mousedown touchstart', inputs.join(','), function(e:JQueryMouseEventObject) {
  activeEl = this;
});

/**
 * Hide the keyboard accessory bar with the next, previous and done buttons.
 *
 * @param hide
 */
export function hideKeyboardAccessoryBar(hide:boolean):void {
  if (!cordovaProxy.isAvailable()) return;
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(hide);
}

/**
 * Close the keyboard if it is open.
 */
export function close():void {
  if (!cordovaProxy.isAvailable()) return;
  cordova.plugins.Keyboard.close();
}

/**
 * Disable native scrolling, useful if you are using JavaScript to scroll
 *
 * @param disbale
 */
export function disableScroll(disable:boolean):void {
  if (!cordovaProxy.isAvailable()) return;
  cordova.plugins.Keyboard.disableScroll(disable);
}

/**
 * Whether or not the keyboard is currently visible.
 */
export function isVisible():boolean {
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

export function listenToChanged(listener:(state:KeyboardState) => void):void {
  currentState.on(CHANGED_EVENT, listener);
}

export function stopListeningToChanged(listener:(state:KeyboardState) => void):void {
  currentState.off(CHANGED_EVENT, listener);
}

window.addEventListener('native.keyboardshow', function(e:IKeyboardShowEvent):void {
  currentState.keyboardIsOpen = true;
  currentState.keyboardHeight = e.keyboardHeight;
  if (currentState.focusedElement) {
    if (currentState.focusedElement[0] !== activeEl) {
      currentState.focusedElement = $(activeEl);
    }
  } else {
    currentState.focusedElement = $(activeEl);
  }
  currentState.trigger(CHANGED_EVENT, currentState);
});

window.addEventListener('native.keyboardhide', function():void {
  if (!currentState.keyboardIsOpen) return;
  currentState.keyboardIsOpen = false;
  currentState.keyboardHeight = null;
  currentState.focusedElement = null;
  currentState.trigger(CHANGED_EVENT, currentState);
});
