"use strict";
//import CompanyShares = require("./CompanyShares");
var utility = require('../Utility/Utility');
var company = require('./CompanyShares');
var utility = new utility();
var StockAccount = /** @class */ (function () {
    function StockAccount(name) {
        this.name = name;
    }
    StockAccount.prototype.buy = function (amount, symbol) {
        var content = utility.getDataFromJson1("company");
        try {
            if (content === null)
                throw "No data found";
            var index;
            for (var i = 0; i < content.companies.length; i++) {
                if (content.companies[i].symbol == symbol) {
                    index = content.companies.indexOf(content.companies[i]);
                }
            }
            var sharesBought = Math.floor(amount / content.companies[index].price);
            var userContent = utility.getDataFromJson1("user");
            var user = {
                name: this.name,
                amount: amount,
                symbol: symbol,
                bought: sharesBought,
                time: new Date().toLocaleString()
            };
            userContent.users.push(user);
            utility.writeInJson("user", userContent);
            var symbolContent = utility.getDataFromJson1("symbol");
            symbolContent.symbols.push(user.symbol);
            utility.writeInJson("symbol", symbolContent);
            var dateContent = utility.getDataFromJson1("date");
            dateContent.dates.push(user.time);
            utility.writeInJson("date", dateContent);
        }
        catch (err) {
            console.log(err);
            askViewer();
        }
    };
    StockAccount.prototype.sell = function (amount, symbol) {
        try {
            var content = utility.getDataFromJson1("user");
            var index;
            for (var i = 0; i < content.users.length; i++) {
                if (content.users[i].symbol == symbol) {
                    index = content.users.indexOf(content.users[i]);
                }
            }
            if (index >= content.users.length) {
                console.log("\nINVALID! No such entry found! Please enter again!\n");
                purposeUser(this.name);
            }
            else if (amount > content.users[index].amount) {
                console.log("Invalid! Enter amount is greater than you've bought!");
                purposeUser(this.name);
            }
            else {
                var share = Math.floor(content.users[index].amount / content.users[index].bought);
                // Decrementing user amount by the amount passed in argument.
                content.users[index].amount -= amount;
                // Updating the shares bought & Time of the transaction.
                content.users[index].bought = Math.floor(content.users[index].amount / share);
                content.users[index].time = new Date().toLocaleString();
                utility.writeInJson("user", content);
                var symbolContent = utility.getDataFromJson1("symbol");
                symbolContent.symbols.push(symbol);
                utility.writeInJson("symbol", symbolContent);
                var dateContent = utility.getDataFromJson1("date");
                dateContent.dates.push(content.users[index].time);
                utility.writeInJson("date", dateContent);
            }
        }
        catch (err) {
            console.log(err);
            askViewer();
        }
    };
    StockAccount.prototype.printReport = function () {
        var content = utility.getDataFromJson1("user");
        var count = 0;
        for (var i = 0; i < content.users.length; i++) {
            if (content.users[i].name == this.name) {
                console.log(content.users[i]);
                count++;
            }
        }
        // If count is still zero, i.e. no transactions are found for that specific user.
        if (count == 0) {
            console.log("No transaction realted to \'" + this.name + "\' exists!");
            process.exit();
        }
        // Also printing the total value of the account.
        this.valueOf();
        process.exit();
    };
    StockAccount.prototype.valueOf = function () {
        var content = utility.getDataFromJson1('user');
        var sum = 0;
        for (var i = 0; i < content.users.length; i++) {
            if (content.users[i].name == this.name) {
                // If name is found, adding it's amount into sum everytime.
                sum += content.users[i].amount;
            }
        }
        // Printing the value of account.
        console.log("Total value of the account is: $" + sum);
        return;
    };
    return StockAccount;
}());
function companyRegistration() {
    try {
        console.log("Enter your company's full Name: ");
        var companyName = utility.getString();
        if (companyName == "")
            throw "\nCompany name expected , no data found";
        console.log("Enter a symbol for the company: ");
        var companySymbol = utility.getString();
        if (companySymbol == "")
            throw "\nCompany symbol expected , no data found";
        console.log("Enter what's your price per share: ");
        var price = utility.getInteger();
        var info = new company();
        if (!isNaN(price)) {
            info.setCompanyName(companyName);
            info.setCompanySymbol(companySymbol);
            info.setCompanyPrice(price);
            var content = utility.getDataFromJson1("company");
            content.companies.push(info);
            utility.writeInJson("company", content);
            console.log("\nStill want to continue ? Press 1\n Wanna exit? Press 2 ");
            var reply = utility.getInteger();
            if (reply == 1) {
                askViewer();
            }
            else {
                exit();
            }
        }
        else {
            console.log("Invalid Input!");
            companyRegistration();
        }
    }
    catch (err) {
        console.log(err);
        companyRegistration();
    }
}
function exit() {
    process.exit();
}
function userRegistration() {
    console.log("Enter your full name ");
    var userName = utility.getString();
    purposeUser(userName);
}
function purposeUser(userName) {
    console.log("Hello " + userName + "What would  you like to do today?\n1.Buy shares\n2.Sell Shares\n3.Get account details\n");
    var answer = utility.getString();
    var stock = new StockAccount(userName);
    if (answer == '1') {
        console.log("\nEnter symbol of the company whose shares you\'d" +
            " like to buy:\n" + displayCompanies() + "\n");
        var getSymbol = utility.getString();
        console.log("Enter the amount you want to invest: ");
        var amount = utility.getInteger();
        stock.buy(amount, getSymbol);
    }
    else if (answer == '2') {
        console.log("\nEnter symbol of the company whose shares you\'d" +
            " like to sell:\n" + displayCompanies() + "\n");
        var getSymbol = utility.getString();
        console.log("Enter the amount you wish to get after selling your shares: ");
        var amount = utility.getInteger();
        stock.sell(amount, getSymbol);
    }
    else if (answer == '3') {
        stock.printReport();
    }
    else {
        console.log("INVALID INPUT! Please enter again! ");
        purposeUser(userName);
    }
}
function companyPurpose() {
    console.log("\nEnter your company name: ");
    var cName = utility.getString();
    if (verifyCompany(cName)) {
        console.log("\nhello " + cName + "\nWhat do you like to do?  \n1.Change symbol \n2.Change price per share ");
        var answer = utility.getString();
        var content = utility.getDataFromJson1("company");
        var index;
        for (var i = 0; i < content.companies.length; i++) {
            if (content.companies[i].name === cName) {
                index = content.companies.indexOf(content.companies[i]);
            }
        }
        if (answer == '1') {
            console.log("Your present symbol is " + content.companies[index].symbol);
            console.log("What would you like to change it to ? ");
            var newSymbol = utility.getInteger();
            content.companies[index].symbol = newSymbol;
            utility.writeInJson("company", content);
            console.log("Succesfully Changed!");
        }
        else {
            console.log("Your present price is " + content.companies[index].price);
            console.log("What would you like to change it to ? ");
            var newPrice = utility.getInteger();
            content.companies[index].price = newPrice;
            utility.writeInJson("company", content);
            console.log("Succesfully Changed!");
        }
    }
}
function verifyCompany(cName) {
    var content = utility.getDataFromJson1("company");
    for (var i = 0; i < content.companies.length; i++) {
        if (content.companies[i].name == cName) {
            return true;
        }
    }
    return false;
}
function displayCompanies() {
    var content = utility.getDataFromJson1("company");
    for (var i = 0; i < content.companies.length; i++) {
        console.log(content.companies[i]);
    }
}
function askViewer() {
    console.log("\nEnter 1 for Company\nEnter 2 for Customer");
    var answer = utility.getString();
    try {
        if (answer == "")
            throw "\nNo input found , Choose between 1 and 2";
        if (answer == '1') {
            console.log("\nNew here? Press 1\nAlready registered? Press 2");
            var answer2 = utility.getString();
            if (answer2 == '1') {
                companyRegistration();
            }
            else {
                companyPurpose();
            }
        }
        else {
            userRegistration();
        }
    }
    catch (err) {
        console.log(err);
        askViewer();
    }
}
askViewer();
module.exports = StockAccount;
