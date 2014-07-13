"use strict";

angular.module("vat.calculator", [])

.factory("vatCalculator", function() {
    return {
        vatOfPrice: function(price, vatRate, piv) {
            if(piv) {
                return price - (price / (1 + vatRate));
            } else {
                return price * vatRate;
            }
        },

        vatRateOfPrice: function(price, vat, piv) {
            if(piv) {
                return vat / (price - vat);
            } else {
                return vat / price;
            }
        },

        priceOfVat: function(vat, vatRate, piv) {
            if(piv) {
                return (vat / vatRate) + vat;
            } else {
                return vat / vatRate;
            }
        }
    };
});
