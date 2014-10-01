"use strict";

angular.module("misc.resource-handler", [
    "misc.class"
])

.factory("ResourceHandler", ["$rootScope", "Class", function($rootScope, Class) {
    return Class.extend({
        init: function(resource, events) {
            this.resource = resource;
            this.instance = null;
            this.events = events || {};
        },
        create: function(params) {
            var instance = new this.resource();

            angular.extend(instance, params);

            var $promise = instance.$save().$promise;

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

            return $promise
        },
        setInstance: function(instance) {
            this.instance = instance;

            var eventName = this.events.changed;
            if(eventName) {
                $rootScope.$broadcast(eventName, this.instance);
            }
        }
    });
}]);
