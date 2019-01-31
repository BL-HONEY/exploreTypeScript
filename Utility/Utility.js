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
    Utility.prototype.deckOfCards = function () {
        /**
         * Declaring rank in sorted format for all number cards
         */
        var rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
        /**
         * declaring symbols for suits
         */
        var symbol = ["♣", "♦", "♥", "♠"];
        /**
         * 4 elements array to store cards for 4 persons
         */
        var distributed = new Array(4);
        /**
         * loop to add 9 element to each element of distributed array
         */
        for (var i = 0; i < distributed.length; i++) {
            distributed[i] = new Array(9);
        }
        /**
         *  array included to store cards
         */
        var included = [], index = 0;
        /**
         * variables row and column to store the random number generated for rows and column..
         */
        var row = 0, column = 0;
        for (var i_1 = 0; i_1 < distributed.length; i_1++) {
            for (var j_1 = 0; j_1 < distributed[i_1].length; j_1++) {
                /**
                 * Generate random values for row & column
                 */
                column = Math.floor(Math.random() * rank.length);
                row = Math.floor(Math.random() * symbol.length);
                /**
                 * Conditional to check whether row and colomn are already included
                 */
                if (!included.includes(row + " " + column)) {
                    /**
                     * If true, then add them to distributed array
                     */
                    distributed[i_1][j_1] = rank[column] + " " + symbol[row];
                    /**
                     * store row and column value to included array
                     */
                    included[index++] = row + " " + column;
                }
                else {
                    /**
                    * If included array doesnt include that values for row and coloumn, decrement j
                    */
                    j_1--;
                }
            }
        }
        var str = "", split1, split2;
        var count = 0;
        for (var i = 0; i < distributed.length; i++) {
            /**
             * sorting and storing to distributed array
             */
            distributed[i].sort(
            /**
        * function to perform sort
        * @param {Number} a
        * @param {NUmber} b
        */
            function (a, b) {
                /**
            * split every column to store it to split11 and split2
            */
                split1 = a.split(" ");
                split2 = b.split(" ");
                count++;
                if (Number(split1[0]) < Number(split2[0])) {
                    // If yes, returning -1.
                    return -1;
                }
                else {
                    // If yes, returning 1.
                    return 1;
                }
            });
            str += "Player " + (i + 1) + ": ";
            console.log("count= " + count);
            // For loop will run till columns of 'card' array to print the array
            for (var j = 0; j < distributed[i].length; j++) {
                /**
                 * Validating & Replacing card present at 'i' & 'j' index of 'card'.
                 * 11 with 'Jack', 12 with 'Queen', 13 with 'King' & 14 with 'Ace'.
                 */
                if (distributed[i][j].split(' ')[0] == 11) {
                    distributed[i][j] = distributed[i][j].replace(/11/g, '☻ Jack');
                }
                else if (distributed[i][j].split(' ')[0] == 12) {
                    distributed[i][j] = distributed[i][j].replace(/12/g, '◕‿◕   Queen');
                }
                else if (distributed[i][j].split(' ')[0] == 13) {
                    distributed[i][j] = distributed[i][j].replace(/13/g, '☹  King');
                }
                else if (distributed[i][j].split(' ')[0] == 14) {
                    distributed[i][j] = distributed[i][j].replace(/14/g, '▲ Ace');
                }
                /**
                 * Adding each element to be printed as a string
                 */
                str += distributed[i][j] + ", ";
            }
            console.log(str);
            str = "";
        }
    };
    return Utility;
}());
module.exports = Utility;
