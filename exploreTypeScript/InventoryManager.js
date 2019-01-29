"use strict";
var utility = require('../Utility/Utility');
var fs = require("fs");
var utility = new utility();
var pricePerKg = [120, 190, 80];
var out = 0, count = 0;
var flag = 0;
var userName = "";
//var coldStore = any[];
var Inventory = /** @class */ (function () {
    function Inventory() {
        this.item = "";
        this.quantity = 0;
        this.price = 0;
        this.coldStore = [];
    }
    Inventory.prototype.getItemType = function () {
        return this.item;
    };
    Inventory.prototype.setItemType = function (item) {
        this.item = item;
    };
    Inventory.prototype.getItemQuantity = function () {
        return this.quantity;
    };
    Inventory.prototype.setItemQuantity = function (quantity) {
        this.quantity = quantity;
    };
    Inventory.prototype.getItemPrice = function () {
        return this.price;
    };
    Inventory.prototype.setItemPrice = function (price) {
        this.price = price;
    };
    Inventory.prototype.purchase = function () {
        if (out == 0) {
            console.log("Please , Enter your name: ");
            userName = utility.getString();
            userName = userName.trim();
            out++;
        }
        try {
            if (userName == "")
                throw "No input found";
            console.log("hi " + userName + " What do you need today ? ");
            console.log("\n 1. Rice \n 2. Pulses \n 3. Wheat ");
            var item = utility.getInteger();
            try {
                if (isNaN(item))
                    throw "No input or String found , Please Enter a value in range 1-3";
                if (item < 1 || item > 3)
                    throw "Please Enter a value in range 1-3";
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
                var store = new Inventory();
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
    Inventory.prototype.viewCart = function () {
        if (flag == 0) {
            console.log("Your cart is Empty... Redirecting to the purchase page ");
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
    Inventory.prototype.exitNow = function () {
        console.log("exiting now.....");
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
var inventory = new Inventory();
function userInterface() {
    console.log("*****Welcome to the Inventory*****");
    console.log("What would you like to do?");
    console.log("\n 1.Purchase \n 2.View Cart \n 3. Delete Saved item  \n 4. Exit");
    var answer = utility.getString();
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
userInterface();
