"use strict";
var utility = require('../Utility/Utility');
var utility = new utility();
var RegularExpression = /** @class */ (function () {
    function RegularExpression() {
    }
    RegularExpression.prototype.userInput = function () {
        try {
            console.log("\nEnter you full name: ");
            var fullName = utility.getString();
            if (fullName == "")
                throw "\nYour full Name is required , Empty string found";
            console.log("\nEnter your Mobile Number: ");
            var mNumber = utility.getString();
            if (mNumber == "")
                throw "\nNo input or String found , Please Enter a valid mobile number. ";
            if (mNumber.length != 10)
                throw "Phone number should only be of 10 digits";
            utility.replaceString(fullName, mNumber);
        }
        catch (err) {
            console.log(err);
            console.log("\nTry again !!!!");
            this.userInput();
        }
    };
    return RegularExpression;
}());
var express = new RegularExpression();
express.userInput();
