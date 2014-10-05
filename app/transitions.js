"use strict";

angular.module("transitions", [])

.constant("STATE_TRANSITIONS", (function() {
    var STATE_TRANSITIONS = {};

    function transition(from, to, animation) {
        if(!STATE_TRANSITIONS[from]) {
            STATE_TRANSITIONS[from] = {};
        }

        if(STATE_TRANSITIONS[from][to]) {
            throw new Error("Transition already present: " + from + " -> " + to + " (" + animation + ")");
        }

        STATE_TRANSITIONS[from][to] = animation;
    }

    transition("login", "signup-user", "slide-left");
    transition("signup-user", "login", "slide-right");

    return STATE_TRANSITIONS;
})());
