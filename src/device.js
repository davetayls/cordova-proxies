define(function (require, exports, module) {/// <reference path="../typings/tsd.d.ts" />
function isIOS() {
    return (/ios/i).test(device.platform);
}
exports.isIOS = isIOS;
function isAndroid() {
    return (/android/i).test(device.platform);
}
exports.isAndroid = isAndroid;
//# sourceMappingURL=device.js.map
});
