
/***************************************************************************** 
* 
*  Purpose         : Create InventoryManager to manage the
*                    Inventory. The Inventory Manager will use InventoryFactory to create Inventory
*                    Object from JSON. The InventoryManager will call each Inventory Object in its list
*                    to calculate the Inventory Price and then call the Inventory Object to return the
*                    JSON String.
* 
*  @description    
* 
*  @file           : InventoryManager.ts
*  @overview       : Create InventoryManager to manage the
*                    Inventory. The Inventory Manager will use InventoryFactory to create Inventory
*                    Object from JSON
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 30-01-2019
*
******************************************************************************/
/** requiring utility class */
var utility = require('../Utility/Utility');

/** including file sysytem module */
var fs = require("fs");

/** create obejct of utility class */
var utility = new utility();

/** setting price of item */
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
class Inventory {

    /**
     * instance member item of string type 
     * @access private
     */
    private item: string = "";

    /**
    * instance member quantity of number type 
    * @access private
    */
    private quantity: number = 0;

    /**
    * instance member price of number type 
    * @access private
    */
    private price: number = 0;

    /**
     * @description getter function to return item type
     * @returns {string} first name
     */
    getItemType(): string {
        return this.item;
    }

    /**
     * @description setter function to set item type
     * @param {string} item 
     */
    setItemType(item: string) {
        this.item = item;
    }

    /**
      * @description getter function to return quantity
      * @returns {string} quantity
      */
    getItemQuantity(): number {
        return this.quantity;
    }

    /**
     * @description setter function to set item's quantity
     * @param {number} quantity 
     */
    setItemQuantity(quantity: number) {
        this.quantity = quantity;
    }

    /**
     * @description getter function to return first name
     * @returns {string} first name
     */
    getItemPrice(): number {
        return this.price;
    }

    /**
     * @description setter function to set item's price
     * @param {number} price 
     */
    setItemPrice(price: number) {
        this.price = price;
    }

    /** a array to store presnt cart item */
    coldStore: any[] = [];

    /**
     * @description function to purchase item
     */
    purchase() {

        if (out == 0) {

            console.log("Please , Enter your name: ");

            /** storing name in userName */
            userName = utility.getString();
            userName = userName.trim();
            out++;
        }
        try {

            /** validating user name */
            if (userName == "") throw "No input found"
            console.log("hi " + userName + " What do you need today ? ");
            console.log("\n 1. Rice \n 2. Pulses \n 3. Wheat ");
            var item = utility.getString();

            try {
                if (item == "") throw "No input or String found , Please Enter a value in range 1-3";
                // if (number(item) < 1 || item > 3) throw "Please Enter a value in range 1-3";

                var nameOfItem = "";
                switch (item) {
                    case '1': nameOfItem = "Rice";
                        break;
                    case '2': nameOfItem = "Pulses";
                        break;
                    case '3': nameOfItem = "Wheat";
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


            } catch (err) {
                console.log(err);
                //   userInterface();
                console.log("");
            }

        } catch (err) {
            console.log(err);
            console.log("");
            out = 0;
            userInterface();
        }
        userInterface();
    }

    /**
     * @description function to ask user if he is done shopping
     */
    ask() {
        console.log("");
        console.log("Are you done for the day?");
        console.log("\n 1. No 2. Yes ");
        var answer = utility.getString();
        // answer = Number(answer.trim());
        try {
            //if (answer < 1 || answer > 2) throw "Please Enter a value in range 1-3";
            if (isNaN(answer)) throw "No input or String found , Please Enter a value in range 1-3";

            if (answer == '1') {
                userInterface();
            } else {
                this.generateBill();
            }
        } catch (err) {
            console.log(err);
            this.ask();
        }
    }

    /**
     * @description function to view items added to cart
     */
    viewCart() {

        if (flag == 0) {
            console.log("\nYour cart is Empty... Redirecting to the purchase page ");
            this.purchase();
        } else {
            for (let index = 0; index < this.coldStore.length; index++) {

                console.log("\n" + userName + " , Items you purchased: " + this.coldStore[index].item + "\n Quantity in Kgs: "
                    + this.coldStore[index].quantity + "\n Price per Kg: " + this.coldStore[index].price + "\n");
            }
            userInterface();
        }
    }

    /**
     * @description function to exit application
     */
    exitNow() {
        console.log("\nexiting now.....");
        process.exit();
    }

    /**
     * @description function to generate bill
     */
    generateBill() {

        var cost = 0;
        console.log("\ngenerating bill.........");

        /** storing data in an array */
        for (let index = 0; index < this.coldStore.length; index++) {
            console.log("\n" + userName + " , Items you purchased: " + this.coldStore[index].item + "\n Quantity in Kgs: "
                + this.coldStore[index].quantity + "\n Price per Kg: " + this.coldStore[index].price);
            cost += this.coldStore[index].price * this.coldStore[index].quantity;
        }

        console.log("\nPlease pay " + cost + " Rs via Cash or Card. ");


        // var content = getDataFromJson();
        // var n = content.length-1;
        // console.log(content[1])


    }

    /**
     * @description function to delete user data
     */
    Delete() {

        try {
            if (count > 0) {

                console.log("Which would you like to delete? \n 1.Rice \n 2. Pulses \n 3. Wheat");

                var answer = utility.getString();
                answer = answer.trim();

                if (answer != ('1' || '2' || '3')) throw "\nchoose from 1-3"

                /** reading inventory file */
                var content = utility.getDataFromJson4();
                var n = content.length;
                var run = n - count;
                var found = false;

                switch (answer) {
                    case '1': for (let i = run; i < content.length; i++) {
                        if (content[i].item == "Rice") {
                            found = true;
                            break;
                        }
                    }
                        if (found == false)
                            console.log("You have not added *Rice* to your cart ");
                        break;
                    case '2': for (let i = run; i < content.length; i++) {
                        if (content[i].item == "Pulses") {
                            found = true;
                        }
                    }
                        if (found == false)
                            console.log("You have not added *Pulses* to your cart ");
                        break;
                    case '3': for (let i = run; i < content.length; i++) {
                        if (content[i].item == "Wheat") {
                            found = true;
                        }
                    }
                        if (found == false)
                            console.log("You have not added *Wheat* to your cart ");
                        break;
                }
                switch (answer) {

                    case '1': if (found == true) {
                        for (let i = run; i < content.length + 1; i++) {
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

                    case '2': if (found == true) {
                        for (let i = run; i < content.length + 1; i++) {
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

                    case '3': if (found == true) {

                        for (let i = run; i < content.length + 1; i++) {

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

            } else {
                console.log("\n First add something to your cart ! ");
                userInterface();
            }

        } catch (err) {

            console.log(err);
            this.Delete();

        }
    }


}

/** creating inventory object to perform operations */
var inventory = new Inventory();

/**
 * @description
 */
function userInterface() {

    console.log("\n*****Welcome to the Inventory*****");

    console.log("What would you like to do?");
    console.log("\n 1.Purchase \n 2.View Cart \n 3. Delete Saved item  \n 4. Exit");

    try {
        var answer = utility.getString();

        /** validating user input */
        if (answer == "") throw "no input found"
        if (answer != ('1' || '2' || '3' || '4')) throw "\nchoose from 1-4"
        /**
         * switch for different services
         */
        switch (answer) {
            case '1': inventory.purchase();
                break;
            case '2': inventory.viewCart();
                break;
            case '3': inventory.Delete()
                break;
            case '4': inventory.exitNow();
                break;
        }

        /** handling exceptions */
    } catch (err) {
        console.log(err);

        userInterface();
    }

}
/** function call to run the code */
userInterface();