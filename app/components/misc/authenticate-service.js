"use strict";

angular.module("misc.authenticate", [
    "config"
])

.service("authenticate", ["$http", "$q", "API_END_POINT", function($http, $q, API_END_POINT) {
    return {
        byEmailAndPassword: function(email, password) {
            if(!email || !password) {
                throw new Error("Email and password required to authenticate.");
            }

            var deferred = $q.defer();

            $http.post(API_END_POINT + "/auth/local", {
                email: email,
                password: password
            }).then(function(response) {
                /* jshint camelcase: false */
                var id = response.data.user_id;
                var token = response.data.access_token;
                var tokenExpires = response.data.access_token_expires;

                if(!id || !token || !tokenExpires) {
                    return deferred.reject(new Error("parse_error"));
                }

                deferred.resolve({
                    id: id,
                    token: token,
                    tokenExpires: tokenExpires
                });
            }, deferred.reject);

            return deferred.promise;
        }
    };
}]);
