"use strict";
var read = require('readline-sync');
var fs = require("fs");
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.prototype.getString = function () {
        var value = read.question("");
        return value;
    };
    Utility.prototype.getInteger = function () {
        var value = read.question("");
        return value;
    };
    Utility.prototype.replaceString = function (name, mob) {
        var template = "Hello <<name>>,\nWe have your full name as <<full name>> in our system.\n" + "Your contact number is 91-xxxxxxxxxx.\nPlease, let us know in case of any" +
            " clarification.\n\nThank you,\nBridgeLabz 01/01/2016.";
        /**
         * Storing the First Name in the template
         */
        var firstName = name.split(/\s/);
        /**
         * Storing the current date using Date.toLocaleDateString() function.
         */
        var date = new Date().toLocaleDateString();
        /**
         * Replace the first name in the template
         */
        template = template.replace(/\<+\w{4}\>+/g, firstName[0]);
        /**
         * Replace the full name in the template
         */
        template = template.replace(/\<+\w{4}\s{1}\w{4}\>+/g, name);
        /**
         * Replace the mobile number in the template
         */
        template = template.replace(/x{10}/, mob);
        /**
         * Replace the date with present day date
         */
        template = template.replace(/\d{2}\/\d{2}\/\d{4}/g, date);
        console.log(template);
    };
    Utility.prototype.getDataFromJson1 = function (found) {
        if (found == "company" || found == "symbol" || found == "date") {
            if (found == "company") {
                var data = fs.readFileSync('../jsonFiles/companyShares.json');
                var content = JSON.parse(data);
                return content;
            }
            else if (found == "symbol") {
                var data = fs.readFileSync('../jsonFiles/symbol.json');
                var content = JSON.parse(data);
                return content;
            }
            else {
                var data = fs.readFileSync('../jsonFiles/date.json');
                var content = JSON.parse(data);
                return content;
            }
        }
        else if (found == "user") {
            var data = fs.readFileSync('../jsonFiles/userShares.json');
            var content = JSON.parse(data);
            return content;
        }
        else {
            console.log("File not found");
        }
    };
    Utility.prototype.getDataFromJson2 = function () {
        var data = fs.readFileSync('../jsonFiles/addressBook.json');
        var content = JSON.parse(data);
        return content;
    };
    Utility.prototype.getDataFromJson3 = function (toRead) {
        if (toRead.startsWith('d') || toRead.startsWith('D')) {
            var data = fs.readFileSync('../jsonFiles/Doctors.json');
            var content = JSON.parse(data);
            return content;
        }
        else {
            var data = fs.readFileSync('../jsonFiles/Patients.json');
            var content = JSON.parse(data);
            return content;
        }
    };
    Utility.prototype.writeInJson = function (found, data) {
        if (found == "company" || found == "symbol" || found == 'date') {
            if (found == "company") {
                fs.writeFileSync('../jsonFiles/companyShares.json', JSON.stringify(data));
            }
            else if (found == "symbol") {
                fs.writeFileSync('../jsonFiles/symbol.json', JSON.stringify(data));
            }
            else {
                fs.writeFileSync('../jsonFiles/date.json', JSON.stringify(data));
            }
            console.log("Data Updated succesfully!");
        }
        else {
            fs.writeFileSync('../jsonFiles/userShares.json', JSON.stringify(data));
            console.log("Data Updated succesfully!");
        }
    };
    Utility.prototype.writeDataToJson2 = function (userData) {
        try {
            if (userData == undefined)
                throw "No data found";
            var converted;
            converted = JSON.stringify(userData);
        }
        catch (err) {
            console.log(err);
        }
        fs.writeFileSync('../jsonFiles/inventory.json', converted);
        return true;
    };
    Utility.prototype.writeDataToJson3 = function (userData) {
        try {
            if (userData == undefined)
                throw "No data found";
            var converted = JSON.stringify(userData);
            console.log("\nJSON String: \n" + converted);
        }
        catch (err) {
            console.log(err);
        }
        fs.writeFileSync('../jsonFiles/stockReport.json', converted);
    };
    Utility.prototype.getDataFromJson4 = function () {
        var data = fs.readFileSync('../jsonFiles/inventory.json');
        var content = JSON.parse(data);
        return content;
    };
    return Utility;
}());
module.exports = Utility;
