"use strict";

angular.module("misc.session", [
    "LocalStorageModule"
])

.service("session", ["localStorageService", Session]);

function Session(localStorageService) {
    this.localStorageService = localStorageService;
    this.prefix = "session_";
    this.authFields = ["userId", "token", "tokenExpires"];
    this.clear();
    this.load();
}

Session.prototype.load = function() {
    _.forEach(this.authFields, function(field) {
        this[field] = this.localStorageService.get(this.prefix + field) || null;
    }, this);
};

Session.prototype.save = function() {
    _.forEach(this.authFields, function(field) {
        this.localStorageService.set(this.prefix + field, this[field]);
    }, this);
};

Session.prototype.isActive = function() {
    return !!this.userId;
};

Session.prototype.isAuthenticated = function() {
    return this.isActive() && !!this.token;
};

Session.prototype.clear = function() {
    this.userId = null;
    this.token = null;
    this.tokenExpires = null;
    this.data = {};
};

Session.prototype.set = function(userId, token, tokenExpires) {
    this.clear();
    this.userId = userId || null;
    this.token = token || null;
    this.tokenExpires = tokenExpires || null;
};
