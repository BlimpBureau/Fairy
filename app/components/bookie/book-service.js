/* global bookie, bookieSwedishHBEF */

"use strict";

angular.module("bookie.book", [
    "resources.partners"
])

.factory("book", ["partners", function(partners) {
    var owners = partners.map(function(partner) {
        return {
            name: partner.fullname
        };
    });

    var book = new bookie.Book();
    book.use(bookieSwedishHBEF({
        owners: owners
    }));

    book.createFiscalYear("2012-01-01", "2012-12-31");
    book.createFiscalYear("2013-01-01", "2013-12-31");
    book.createFiscalYear("2014-01-01", "2014-12-31");

    book.createVerification("2012-02-11", "Domain names").credit(2010, 188).debit(2640, 37.6).debit(6500, 150.4);
    book.createVerification("2012-03-04", "Paper holders").credit(2010, 29).debit(2640, 5.8).debit(6100, 23.2);
    book.createVerification("2012-03-09", "Office stuff").credit(2010, 31).debit(2640, 6.2).debit(6100, 24.8);
    book.createVerification("2012-03-09", "Post stamps").credit(2010, 18).debit(2640, 3.6).debit(6100, 14.4);
    book.createVerification("2012-03-24", "iPad", [0, 1]).credit(2020, 7195).debit(2640, 1439).debit(5400, 5756);
    book.createVerification("2012-10-04", "Sold product", [0, 1]).debit(1930, 7500).credit(2610, 1500).credit(3000, 6000);
    book.createVerification("2012-12-31", "Result of year 2012").credit(2010, 15.60).credit(2020, 15.60).debit(8999, 31.2);
    book.createVerification("2012-12-31", "Zero out VAT").debit(2610, 1500).credit(2640, 1492.2).credit(2650, 7.8);

    book.createVerification("2013-01-21", "Domain names").credit(2010, 188).debit(2640, 37.6).debit(6500, 150.4);
    book.createVerification("2013-01-30", "Bank cards").credit(1930, 250).debit(6570, 250);
    book.createVerification("2013-02-06", "Own withdrawal Jane").credit(1930, 500).debit(2020, 500);
    book.createVerification("2013-02-06", "Own withdrawal Jane").credit(1930, 6500).debit(2020, 6500);
    book.createVerification("2013-02-18", "Customer number 2").debit(1930, 3750).credit(2610, 750).credit(3000, 3000);
    book.createVerification("2013-04-15", "Yearly bank cost").credit(1930, 1200).debit(6570, 1200);
    book.createVerification("2013-10-17", "Customer number 3", [0, 1]).debit(1930, 1000).credit(2610, 200).credit(3000, 800);
    book.createVerification("2013-12-09", "RAM memory", [0, 1]).credit(1930, 1449).debit(2640, 289.8).debit(5400, 1159.2);
    book.createVerification("2013-12-17", "SSD-kit", [0, 1]).credit(1930, 402.89).credit(2615, 100.72).debit(2645, 100.72).debit(4056, 402.89);
    book.createVerification("2013-12-27", "iPhone 5s", [1, 0]).credit(2010, 6795).debit(2640, 1359).debit(5400, 5436);

    return book;
}]);
