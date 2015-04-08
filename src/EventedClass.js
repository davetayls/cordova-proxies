define(function (require, exports, module) {/// <reference path="../typings/tsd.d.ts" />
var Backbone = require('backbone');
var _ = require('underscore');
var EventedClass = (function () {
    function EventedClass() {
    }
    return EventedClass;
})();
exports.EventedClass = EventedClass;
_.extend(EventedClass.prototype, Backbone.Events);

});
