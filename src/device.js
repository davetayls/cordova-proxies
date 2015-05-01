define(function (require, exports, module) {/// <reference path="../typings/tsd.d.ts" />
function isIOS() {
    return (/ios/i).test(device.platform);
}
exports.isIOS = isIOS;
function isAndroid() {
    return (/android/i).test(device.platform);
}
exports.isAndroid = isAndroid;
function isAmazonFireOS() {
    return (/amazon-fireos/i).test(device.platform);
}
exports.isAmazonFireOS = isAmazonFireOS;
function isAndroidBased() {
    return isAndroid() || isAmazonFireOS();
}
exports.isAndroidBased = isAndroidBased;

});
