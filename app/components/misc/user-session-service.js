"use strict";

angular.module("misc.user-session", [])

.service("userSession", UserSession);

function UserSession() {
    this.clear();
}

UserSession.prototype.isActive = function() {
    return !!this.userId;
};

UserSession.prototype.isAuthenticated = function() {
    return this.isActive() && !!this.token;
};

UserSession.prototype.clear = function() {
    this.userId = null;
    this.token = null;
    this.tokenExpires = null;
};

UserSession.prototype.set = function(userId, token, expires) {
    this.clear();
    this.userId = userId || null;
    this.token = token || null;
    this.expires = expires || null;
};
