define(function (require, exports, module) {'use strict';
exports.show = function() {
  if (navigator.splashscreen) {
    return navigator.splashscreen.show();
  }
};

exports.hide = function() {
  if (navigator.splashscreen) {
    return navigator.splashscreen.hide();
  }
};

});
