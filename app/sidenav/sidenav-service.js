"use strict";

angular.module("sidenav.handler", [])

.service("sidenavHandler", NavbarHandler);

function NavbarHandler() {
    this.init();
}

NavbarHandler.prototype.init = function() {
    this.items = [];
    this.showItems = null;
    this.aliases = {};
};

NavbarHandler.prototype.getItems = function(all) {
    if(all) {
        return this.items;
    }

    return this.showItems;
};

NavbarHandler.prototype.insert = function(method, state, text, icon, hide, alias) {
    hide = hide || false;

    this.items.push({
        state: state,
        text: text,
        icon: icon,
        show: !hide
    });

    if(alias) {
        this.aliases[alias] = _.last(this.items);
    }

    this.update();
};

NavbarHandler.prototype.prepend = _.partial(NavbarHandler.prototype.insert, "unshift");
NavbarHandler.prototype.append = _.partial(NavbarHandler.prototype.insert, "push");

NavbarHandler.prototype.update = function() {
    this.showItems = _.filter(this.items, isShow);
};

NavbarHandler.prototype.changeItemByAlias = function(alias, state, text, icon, show) {
    if(_.isObject(state)) {
        var params = state;
        state = params.state;
        text = params.text;
        icon = params.icon;
        show = params.show;
    }

    var item = this.aliases[alias];

    if(!item) {
        throw new Error("Invalid alias.");
    }

    item.state = state;
    item.text = text;
    item.icon = icon;
    item.show = show;

    this.update();
};

function isShow(item) {
    return item.show;
}
