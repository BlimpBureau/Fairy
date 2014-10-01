"use strict";

angular.module("misc.resource-handler", [
    "misc.class"
])

.factory("ResourceHandler", ["Class", function(Class) {
    return Class.extend({
        init: function(resource) {
            this.resource = resource;
            this.instance = null;
        },
        create: function(params, successCallback, errorCallback) {
            var instance = new this.resource();

            angular.extend(instance, params);

            instance.$save(function(instance) {
                this.instance = instance;
                successCallback(instance);
            }.bind(this), errorCallback);
        },
        get: function(id, successCallback, errorCallback) {
            if(!_.isNumber(id)) {
                if(_.isFunction(id)) {
                    errorCallback = successCallback;
                    successCallback = id;
                    id = null;
                }
            }

            successCallback = successCallback || _.noop;
            errorCallback = errorCallback || _.noop;

            if(!id) {
                if(this.instance && this.instance.id) {
                    id = this.instance.id;
                }
            }

            if(!id) {
                throw new Error("id required.");
            }

            this.resource.get({ id: id }, function(instance) {
                this.instance = instance;
                successCallback(instance);
            }.bind(this), errorCallback);
        }
    });
}]);
