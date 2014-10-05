"use strict";

angular.module("misc.login", [
    "misc.authenticate",
    "misc.session",
    "resources.user",
    "resources.company"
])

.service("loginService", Login);

function Login($q, authenticate, session, userService, companyService) {
    this.$q = $q;
    this.authenticate = authenticate;
    this.session = session;
    this.userService = userService;
    this.companyService = companyService;
    this.dataLoaded = false;
}

Login.$inject = ["$q", "authenticate", "session", "userService", "companyService"];

Login.prototype.loginByEmailAndPassword = function(username, password, remember) {
    var deferred = this.$q.defer();

    this.authenticate.byEmailAndPassword(username, password).then(function(authResult) {
        this.session.set(authResult.id, authResult.token, authResult.expires);

        if(remember) {
            this.session.save();
        }

        this.loadData(authResult.id, deferred);
    }.bind(this), deferred.reject);

    return deferred.promise;
};

Login.prototype.loginByToken = function(id, token) {
    if(!id || !token) {
        throw new Error("id and token required.");
    }

    var deferred = this.$q.defer();

    this.loadData(id, deferred);

    return deferred.promise;
};

Login.prototype.loadData = function(userId, deferred) {
    this.userService.get(userId).then(function(user) {
        if(!user.companies.length) {
            return deferred.resolve({
                user: user
            });
        }

        var companyId = user.companies[0];

        this.companyService.get(companyId).then(function(company) {
            this.dataLoaded = true;
            deferred.resolve({
                user: user,
                company: company
            });
        }.bind(this), deferred.reject);
    }.bind(this), deferred.reject);
};

Login.prototype.isDataLoaded = function() {
    return this.dataLoaded;
};
