/**
 * Dialogs helpers
 *
 * Requires:
 * cordova plugin add cordova-plugin-dialogs --save
 */
/// <reference path="../typings/tsd.d.ts" />

export function alert(message:string, cb:() => void, title?:string, buttonName?:string):void {
  if (navigator.notification) {
    navigator.notification.alert(message, cb, title, buttonName);
  } else {
    window.alert(message || title);
    cb();
  }
}

export function confirm(message: string, confirmCallback: (choice: number) => void, title?: string, buttonLabels?: string[]): void {
  if (navigator.notification) {
    navigator.notification.confirm(message, confirmCallback, title, buttonLabels);
  } else {
    var result = window.confirm(message || title);
    if (result) {
      confirmCallback(1);
    } else {
      confirmCallback(2);
    }
  }

}
