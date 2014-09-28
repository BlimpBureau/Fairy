"use strict";

angular.module("misc.user-session", [])

.service("userSession", UserSession);

function UserSession() {
    this.clear();
}

UserSession.prototype.isActive = function() {
    return !!this.user;
};

UserSession.prototype.isAuthenticated = function() {
    return this.isActive() && !!this.token;
};

UserSession.prototype.clear = function() {
    this.user = null;
    this.token = null;
    this.tokenExpires = null;
};

UserSession.prototype.set = function(user, token, expires) {
    this.clear();
    this.user = user;
    this.token = token || null;
    this.expires = expires || null;
};
