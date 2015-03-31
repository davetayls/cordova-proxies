/// <reference path="../typings/tsd.d.ts" />

export function isAvailable():boolean {
  return typeof cordova !== 'undefined';
}
