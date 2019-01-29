"use strict";
var fs = require('fs');
var initial = 1;
var utility = require('../Utility/Utility');
var Utility = new utility();
var Stock = /** @class */ (function () {
    function Stock() {
        this.stockName = "";
        this.noOfShares = 0;
        this.priceOfEach = 0;
        // constructor(stockName, noOfShares, priceOfEach) {
        //     this.stockName = stockName;
        //     this.noOfShares = noOfShares;
        //     this.priceOfEach = priceOfEach;
        // }
    }
    Stock.prototype.getStockName = function () {
        return this.stockName;
    };
    Stock.prototype.setStockName = function (stockName) {
        this.stockName = stockName;
    };
    Stock.prototype.getNoOfShares = function () {
        return this.noOfShares;
    };
    Stock.prototype.setNoOfShares = function (noOfShares) {
        this.noOfShares = noOfShares;
    };
    Stock.prototype.getPriceOfEach = function () {
        return this.priceOfEach;
    };
    Stock.prototype.setPriceOfEach = function (priceOfEach) {
        this.priceOfEach = priceOfEach;
    };
    return Stock;
}());
var StockPortfolio = /** @class */ (function () {
    function StockPortfolio() {
    }
    StockPortfolio.prototype.calCostOfeachStack = function (noOfShares, priceOfEach) {
        return noOfShares * priceOfEach;
    };
    StockPortfolio.prototype.calCostOfAllStack = function (array) {
        return array.reduce(function (a, b) {
            return a + b;
        }, 0);
    };
    StockPortfolio.prototype.userInput = function (noOfStocks) {
        var stockInfo = [];
        var costOfEach = [];
        var stock = new StockPortfolio;
        while (initial <= noOfStocks) {
            console.log("Please , Enter name of the stock: ");
            var stockName = Utility.getString();
            stockName = stockName.trim();
            console.log("Please , Enter total number of shares have you bought?: ");
            var noOfShares = Utility.getInteger();
            console.log("Please , Enter price of each share: ");
            var priceOfEach = Utility.getInteger();
            var stocks = new Stock();
            stocks.setStockName(stockName);
            stocks.setNoOfShares(noOfShares);
            stocks.setPriceOfEach(priceOfEach);
            stockInfo.push(stocks);
            initial++;
        }
        Utility.writeDataToJson3(stockInfo);
        console.log("\n--------***** STOCK REPORT *****--------");
        for (var i = 0; i < stockInfo.length; i++) {
            costOfEach[i] = stock.calCostOfeachStack(stockInfo[i].getPriceOfEach(), stockInfo[i].getNoOfShares());
            console.log(stockInfo[i].getStockName() + "'s Price is: " + costOfEach[i]);
        }
        var total = stock.calCostOfAllStack(costOfEach);
        console.log("Total investment done : " + total);
    };
    StockPortfolio.prototype.userInterface = function () {
        console.log("Enter number of stocks have you bought: ");
        var totalStocks = Utility.getInteger();
        this.userInput(totalStocks);
    };
    return StockPortfolio;
}());
var s = new StockPortfolio();
s.userInterface();
