var read = require('readline-sync');
var fs = require("fs");

/***************************************************************************** 
* 
*  Purpose         : Create one utility class which contains various function which can be reused in the project
* 
*  @description    
* 
*  @file           : Utility.ts
*  @overview       : Utility file contains some common methods which are used elsewhere in the project
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 28-01-2019
*
******************************************************************************/
/**
 * @description class Utility.ts
 * 
 * @class Utility
 * @purpose Contains functions to be used elsewhere in the project
 */
class Utility {
    constructor() { }
    
    /**
     * @description function to get a string input from user
     * @returns {string} value
     */
    getString(): string {

        let value = read.question("");
        return value;

    }
    
    /**
     * @description function to get integer input from user
     * @returns {number} value
     */
    getInteger(): number {

        let value = read.question("");
        return value;

    }
    
    /**
     * @description function to replace string ina template
     * @param {string} name 
     * @param {string} mob 
     */
    replaceString(name: string, mob: string) {
        var template = "Hello <<name>>,\nWe have your full name as <<full name>> in our system.\n" + "Your contact number is 91-xxxxxxxxxx.\nPlease, let us know in case of any" +
            " clarification.\n\nThank you,\nBridgeLabz 01/01/2016."
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

    }
    
    /**
     * @description function to get json data
     * @param {string} found 
     * @returns {string} content
     */
    getDataFromJson1(found: string) {


        if (found == "company" || found == "symbol" || found == "date") {

            if (found == "company") {
                var data = fs.readFileSync('../jsonFiles/companyShares.json');
                var content = JSON.parse(data);
                return content;

            } else if (found == "symbol") {
                var data = fs.readFileSync('../jsonFiles/symbol.json');
                var content = JSON.parse(data);
                return content;
            } else {
                var data = fs.readFileSync('../jsonFiles/date.json');
                var content = JSON.parse(data);
                return content;
            }
        }
        else if (found == "user") {

            var data = fs.readFileSync('../jsonFiles/userShares.json');
            var content = JSON.parse(data);
            return content;
        } else {
            console.log("File not found");
        }
    }
    
    /**
     * @description read json file
     * @returns json data
     */
    getDataFromJson2() {

        var data = fs.readFileSync('../jsonFiles/addressBook.json');
        var content = JSON.parse(data);
        return content;

    }
    
    /**
     * @description read json file
     * @param {string} toRead 
     */
    getDataFromJson3(toRead: any) {

        if (toRead.startsWith('d') || toRead.startsWith('D')) {
            var data = fs.readFileSync('../jsonFiles/Doctors.json');
            var content = JSON.parse(data);
            return content;
        } else {
            var data = fs.readFileSync('../jsonFiles/Patients.json');
            var content = JSON.parse(data);
            return content;
        }
    }
    
    /**
     * @description write to json file
     * @param {string} found 
     * @param {string} data 
     */
    writeInJson(found: string, data: string) {
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
    }
    
    /**
     * @description write to json
     * @param {string} userData 
     */
    writeDataToJson2(userData: any) {
        try {
            if (userData == undefined) throw "No data found"
            var converted;
            converted = JSON.stringify(userData);

        } catch (err) {
            console.log(err);
        }

        fs.writeFileSync('../jsonFiles/inventory.json', converted);
        return true;
    }
    
    /**
     * @description write to json file
     * @param {string} userData 
     */
    writeDataToJson3(userData: any) {
        try {
            if (userData == undefined) throw "No data found"
            var converted: any = JSON.stringify(userData);
            console.log("\nJSON String: \n" + converted);

        } catch (err) {
            console.log(err);
        }

        fs.writeFileSync('../jsonFiles/stockReport.json', converted);

    }
    
    /**
     * @description read json file
     * @returns content 
     */
    getDataFromJson4() {

        var data = fs.readFileSync('../jsonFiles/inventory.json');
        var content = JSON.parse(data);
        return content;
    }
   
    /**
     * @description distribute cards function
     */
    deckOfCards() {
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
        var distributed : any = new Array(4);
        /**
         * loop to add 9 element to each element of distributed array
         */
        for (var i = 0; i < distributed.length; i++) {
            distributed[i] = new Array(9);
        }
        /**
         *  array included to store cards 
         */
        var included: any = [],
            index = 0;
        /**
         * variables row and column to store the random number generated for rows and column..
         */
        var row = 0, column = 0;

        for (let i = 0; i < distributed.length; i++) {

            for (let j = 0; j < distributed[i].length; j++) {
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
                    distributed[i][j] = rank[column] + " " + symbol[row];
                    /**
                     * store row and column value to included array
                     */
                    included[index++] = row + " " + column;
                } else {
                    /**
                    * If included array doesnt include that values for row and coloumn, decrement j
                    */
                    j--;
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
                function (a: any, b: any) {

                    /**
                * split every column to store it to split11 and split2
                */
                    split1 = a.split(" ");
                    split2 = b.split(" ");

                    count++;

                    if (Number(split1[0]) < Number(split2[0])) {
                        // If yes, returning -1.
                        return -1;
                    } else {
                        // If yes, returning 1.
                        return 1;
                    }
                });
            str += "Player " + (i + 1) + ": ";
            console.log("count= " + count)
            // For loop will run till columns of 'card' array to print the array
            for (var j = 0; j < distributed[i].length; j++) {
                /**
                 * Validating & Replacing card present at 'i' & 'j' index of 'card'.
                 * 11 with 'Jack', 12 with 'Queen', 13 with 'King' & 14 with 'Ace'.
                 */
                if (distributed[i][j].split(' ')[0] == 11) {
                    distributed[i][j] = distributed[i][j].replace(/11/g, '☻ Jack');
                } else if (distributed[i][j].split(' ')[0] == 12) {
                    distributed[i][j] = distributed[i][j].replace(/12/g, '◕‿◕   Queen');
                } else if (distributed[i][j].split(' ')[0] == 13) {
                    distributed[i][j] = distributed[i][j].replace(/13/g, '☹  King');
                } else if (distributed[i][j].split(' ')[0] == 14) {
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
    }
}
/**
 * export the class Utility to be used elsewhere
 */
export = Utility;