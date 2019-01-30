var utility = require('../Utility/Utility');
var fs = require("fs");
var utility = new utility();
var pricePerKg = [120, 190, 80];
var out = 0, count = 0;
var flag = 0;
var userName = "";
/**
 * @description class AddressBook
 *
 * @class AddressBook
 * @purpose This programme to maintain an address book. An address book
 * holds a collection of entries, each recording a person's first and last names, address, city, state, zip, and
 * phone number.
 */
var Inventory = /** @class */ (function () {
    function Inventory() {
        /**
         * instance member item of string type
         * @access private
         */
        this.item = "";
        /**
        * instance member quantity of number type
        * @access private
        */
        this.quantity = 0;
        /**
        * instance member price of number type
        * @access private
        */
        this.price = 0;
        /** a array to store presnt cart item */
        this.coldStore = [];
    }
    /**
     * @description getter function to return item type
     * @returns {string} first name
     */
    Inventory.prototype.getItemType = function () {
        return this.item;
    };
    /**
     * @description setter function to set item type
     * @param {string} item
     */
    Inventory.prototype.setItemType = function (item) {
        this.item = item;
    };
    /**
      * @description getter function to return quantity
      * @returns {string} quantity
      */
    Inventory.prototype.getItemQuantity = function () {
        return this.quantity;
    };
    /**
     * @description setter function to set item's quantity
     * @param {number} quantity
     */
    Inventory.prototype.setItemQuantity = function (quantity) {
        this.quantity = quantity;
    };
    /**
     * @description getter function to return first name
     * @returns {string} first name
     */
    Inventory.prototype.getItemPrice = function () {
        return this.price;
    };
    /**
     * @description setter function to set item's price
     * @param {number} price
     */
    Inventory.prototype.setItemPrice = function (price) {
        this.price = price;
    };
    /**
     * @description function to purchase item
     */
    Inventory.prototype.purchase = function () {
        if (out == 0) {
            console.log("Please , Enter your name: ");
            /** storing name in userName */
            userName = utility.getString();
            userName = userName.trim();
            out++;
        }
        try {
            /** validating user name */
            if (userName == "")
                throw "No input found";
            console.log("hi " + userName + " What do you need today ? ");
            console.log("\n 1. Rice \n 2. Pulses \n 3. Wheat ");
            var item = utility.getString();
            try {
                if (item == "")
                    throw "No input or String found , Please Enter a value in range 1-3";
                // if (number(item) < 1 || item > 3) throw "Please Enter a value in range 1-3";
                var nameOfItem = "";
                switch (item) {
                    case '1':
                        nameOfItem = "Rice";
                        break;
                    case '2':
                        nameOfItem = "Pulses";
                        break;
                    case '3':
                        nameOfItem = "Wheat";
                        break;
                }
                console.log("How much of " + nameOfItem + " do you want ?" + "\n Please Enter quantity in Kgs ");
                var quantity = utility.getInteger();
                //quantity = Number(quantity.trim());
                /** creating obejct of type store */
                var store = new Inventory();
                /**
                 * calling setter functions to set item , quantity and price
                 */
                store.setItemType(nameOfItem);
                store.setItemQuantity(quantity);
                store.setItemPrice(pricePerKg[item - 1]);
                //  var content= getDataFromJson();
                this.coldStore.push(store);
                var content = utility.getDataFromJson4();
                content.push(store);
                utility.writeDataToJson2(content);
                count++;
                flag = 1;
                console.log("count= " + count);
                this.ask();
            }
            catch (err) {
                console.log(err);
                //   userInterface();
                console.log("");
            }
        }
        catch (err) {
            console.log(err);
            console.log("");
            out = 0;
            userInterface();
        }
        userInterface();
    };
    /**
     * @description function to ask user if he is done shopping
     */
    Inventory.prototype.ask = function () {
        console.log("");
        console.log("Are you done for the day?");
        console.log("\n 1. No 2. Yes ");
        var answer = utility.getString();
        // answer = Number(answer.trim());
        try {
            //if (answer < 1 || answer > 2) throw "Please Enter a value in range 1-3";
            if (isNaN(answer))
                throw "No input or String found , Please Enter a value in range 1-3";
            if (answer == '1') {
                userInterface();
            }
            else {
                this.generateBill();
            }
        }
        catch (err) {
            console.log(err);
            this.ask();
        }
    };
    /**
     * @description function to view items added to cart
     */
    Inventory.prototype.viewCart = function () {
        if (flag == 0) {
            console.log("\nYour cart is Empty... Redirecting to the purchase page ");
            this.purchase();
        }
        else {
            for (var index = 0; index < this.coldStore.length; index++) {
                console.log("\n" + userName + " , Items you purchased: " + this.coldStore[index].item + "\n Quantity in Kgs: "
                    + this.coldStore[index].quantity + "\n Price per Kg: " + this.coldStore[index].price + "\n");
            }
            userInterface();
        }
    };
    /**
     * @description function to exit application
     */
    Inventory.prototype.exitNow = function () {
        console.log("\nexiting now.....");
        process.exit();
    };
    Inventory.prototype.generateBill = function () {
        var cost = 0;
        console.log("generating bill.........");
        console.log("");
        for (var index = 0; index < this.coldStore.length; index++) {
            console.log("\n" + userName + " , Items you purchased: " + this.coldStore[index].item + "\n Quantity in Kgs: "
                + this.coldStore[index].quantity + "\n Price per Kg: " + this.coldStore[index].price);
            cost += this.coldStore[index].price * this.coldStore[index].quantity;
        }
        console.log("");
        console.log("Please pay " + cost + " Rs via Cash or Card. ");
        // var content = getDataFromJson();
        // var n = content.length-1;
        // console.log(content[1])
    };
    Inventory.prototype.Delete = function () {
        if (count > 0) {
            console.log("Which would you like to delete? \n 1.Rice \n 2. Pulses \n 3. Wheat");
            var answer = utility.getString();
            answer = answer.trim();
            var content = utility.getDataFromJson4();
            var n = content.length;
            var run = n - count;
            var found = false;
            switch (answer) {
                case '1':
                    for (var i = run; i < content.length; i++) {
                        if (content[i].item == "Rice") {
                            found = true;
                            break;
                        }
                    }
                    if (found == false)
                        console.log("You have not added *Rice* to your cart ");
                    break;
                case '2':
                    for (var i = run; i < content.length; i++) {
                        if (content[i].item == "Pulses") {
                            found = true;
                        }
                    }
                    if (found == false)
                        console.log("You have not added *Pulses* to your cart ");
                    break;
                case '3':
                    for (var i = run; i < content.length; i++) {
                        if (content[i].item == "Wheat") {
                            found = true;
                        }
                    }
                    if (found == false)
                        console.log("You have not added *Wheat* to your cart ");
                    break;
            }
            switch (answer) {
                case '1':
                    if (found == true) {
                        for (var i = run; i < content.length + 1; i++) {
                            if (content[i].item == "Rice") {
                                var index = content.indexOf(content[i]);
                                content.splice(index, 1);
                            }
                        }
                        utility.writeDataToJson2(content);
                        console.log("\nDeleted Sucessfully !!");
                        --count;
                    }
                    break;
                case '2':
                    if (found == true) {
                        for (var i = run; i < content.length + 1; i++) {
                            if (content[i].item == "Pulses") {
                                var index = content.indexOf(content[i]);
                                content.splice(index, 1);
                            }
                        }
                        utility.writeDataToJson2(content);
                        console.log("\nDeleted Sucessfully !!");
                        --count;
                    }
                    break;
                case '3':
                    if (found == true) {
                        for (var i = run; i < content.length + 1; i++) {
                            if (content[i].item == "Wheat") {
                                var index = content.indexOf(content[i]);
                                content.splice(index, 1);
                            }
                        }
                        utility.writeDataToJson2(content);
                        console.log("\nDeleted Sucessfully !!");
                        --count;
                    }
                    break;
            }
            found = false;
            userInterface();
        }
        else {
            console.log("\n First add something to your cart ! ");
            userInterface();
        }
    };
    return Inventory;
}());
/** creating inventory object to perform operations */
var inventory = new Inventory();
/**
 * @description
 */
function userInterface() {
    console.log("*****Welcome to the Inventory*****");
    console.log("What would you like to do?");
    console.log("\n 1.Purchase \n 2.View Cart \n 3. Delete Saved item  \n 4. Exit");
    try {
        var answer = utility.getString();
        if (answer == "")
            throw "no input found";
        if (answer != ('1' || '2' || '3' || '4'))
            throw "choose from 1-4";
        /**
         * switch for different services
         */
        switch (answer) {
            case '1':
                inventory.purchase();
                break;
            case '2':
                inventory.viewCart();
                break;
            case '3':
                inventory.Delete();
                break;
            case '4':
                inventory.exitNow();
                break;
        }
    }
    catch (err) {
        console.log(err);
        userInterface();
    }
}
userInterface();
