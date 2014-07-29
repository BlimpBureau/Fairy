/* global bookie:false */

"use strict";

angular.module("presentation.moneyFilter", [])

.filter("moneyFilter", function() {
    function getDecimalDelim(number) {
        //Check if there are any decimals by dropping decimals and comparing to original.
        if(number === (number | 0)) {
            return null; //No decimals.
        }

        var stringNumber = String(number);

        var possibleDelims = [".", ","];

        var found;

        _.forEach(possibleDelims, function(delim) {
            if(~stringNumber.indexOf(delim)) {
                found = delim;
                return false;
            }
        });

        if(!found) {
            throw new Error("Invalid number decimal delim. Number: " + number);
        }

        return found;
    }

    function spaceNumber(number) {
        var DELIM = 3;

        var digits = String(number);

        var output = "";
        var count = 0;

        _.forEachRight(digits, function(digit, i) {
            output = digit + output;
            count++;

            if(count === DELIM && i) {
                output = " " + output;
                count = 0;
            }
        });

        return output;
    }

    return function(value, showZero, decimals) {
        showZero = (showZero === false ? showZero : true);
        decimals = (_.isNumber(decimals) ? decimals : 2);

        //TODO: Use upcoming bookie number parser.
        value = parseFloat(value);

        value = bookie.round(value, decimals);

        if(!_.isNumber(value) || _.isNaN(value)) {
            throw new Error("Failed to parse value: " + value);
        }

        if(!value && !showZero) {
            return "";
        }

        var decimalDelim = getDecimalDelim(value);

        if(!decimalDelim) {
            return spaceNumber(value);
        }

        var parts = String(value).split(decimalDelim);
        return spaceNumber(parts[0]) + decimalDelim + parts[1];
    };
})

;
