"use strict";

angular.module("misc.event-emitter", [
    "misc.class"
])

.factory("EventEmitter", ["Class", function(Class) {
    return Class.extend({
        init: function() {
            this.events = {};
        },
        on: function(event, callback) {
            if(!this.events[event]) {
                this.events[event] = [];
            }

            this.events[event].push(callback);
        },
        emit: function(event) {
            if(!this.events[event]) {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1, arguments.length);

            _.forEach(this.events[event], function(callback) {
                callback.apply(null, args);
            });
        }
    });
}]);
