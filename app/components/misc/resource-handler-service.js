"use strict";

angular.module("misc.resource-handler", [
    "misc.event-emitter"
])

.factory("ResourceHandler", ["EventEmitter", function(EventEmitter) {
    return EventEmitter.extend({
        init: function(resource) {
            this._super();
            this.resource = resource;
            this.instance = null;
        },
        create: function(params) {
            var instance = new this.resource();

            angular.extend(instance, params);

            var $promise = instance.$save();

            $promise.then(function(instance) {
                this.setInstance(instance);
            }.bind(this));

            return $promise;
        },
        get: function(id) {
            if(!id) {
                if(this.instance && this.instance.id) {
                    id = this.instance.id;
                }
            }

            if(!id) {
                throw new Error("id required.");
            }

            var $promise = this.resource.get({ id: id }).$promise;

            $promise.then(function(instance) {
                this.setInstance(instance);
            }.bind(this));

            return $promise;
        },
        setInstance: function(instance) {
            this.instance = instance;
            this.emit("changed", this.instance);
        }
    });
}]);
