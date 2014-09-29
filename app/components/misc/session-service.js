"use strict";

angular.module("misc.session", [])

.service("session", Session);

function Session() {
    this.clear();
}

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

Session.prototype.set = function(userId, token, expires) {
    this.clear();
    this.userId = userId || null;
    this.token = token || null;
    this.expires = expires || null;
};
