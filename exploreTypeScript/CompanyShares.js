"use strict";
var CompanyShares = /** @class */ (function () {
    function CompanyShares() {
        this.name = "";
        this.symbol = "";
        this.price = 0;
    }
    CompanyShares.prototype.getCompanyName = function () {
        return this.name;
    };
    CompanyShares.prototype.getCompanySymbol = function () {
        return this.symbol;
    };
    CompanyShares.prototype.getCompanyPrice = function () {
        return this.price;
    };
    CompanyShares.prototype.setCompanyName = function (name) {
        this.name = name;
    };
    CompanyShares.prototype.setCompanySymbol = function (symbol) {
        this.symbol = symbol;
    };
    CompanyShares.prototype.setCompanyPrice = function (price) {
        this.price = price;
    };
    return CompanyShares;
}());
module.exports = CompanyShares;
