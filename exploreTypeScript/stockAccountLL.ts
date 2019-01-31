/** requiring utility class */
var utility = require('../Utility/Utility');

/** creating object of utility class */
var Utility = new utility();

var aLink = require('../../Utility/LinkedList');


var fs = require("fs");
/***************************************************************************** 
* 
*  Purpose         :  Maintain the List of CompanyShares in a Linked List So new CompanyShares can
*                     be added or removed easily.
* 
*  @description    
* 
*  @file           : stockAccount.ts
*  @overview       : CompanyShares class to perform various functions
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 31-01-2019
*
******************************************************************************/

/**
 * @description class CompanyShares
 * 
 * @class CompanyShares
 * @purpose Creates CompanyShares OBject contains various manipulation functions
 */
class CompanyShares {
    
    /**
    * instance member name of string type 
    * @access private
    */
    private name: string = "";

    /**
    * instance member symbol of string type 
    * @access private
    */
    private symbol: string = "";

    /**
     * instance member price of number type 
     * @access private
     */
    private price: number = 0;
    
    /**
    * @description getter function to return name
    * @returns {string} name
    */
    getName(): string {
        return this.name;
    }
    
   
    setName(name: string) {
        this.name = name;
    }
    
     /**
    * @description getter function to return symbol
    * @returns {string} symbol
    */
    getSymbol(): string {
        return this.symbol
    }

    setSymbol(symbol: string) {
        this.symbol = symbol
    }

    getPrice(): number {
        return this.price
    }

    setPrice(price: number) {
        this.price = price;
    }
    // constructor(name:string , symbol : string, price : number) {
    //     this.name = name;
    //     this.symbol = symbol;
    //     this.price = price;
    // }
}
/**
 * creates an object list to perform linkedlist operations
 */
var list = new aLink.LinkedList;

/**
 * @description fucntion to handle user
 */
function askViewer() {

    console.log("\nEnter 1 to proceed");

    /** getting user's reply */
    var answer = Utility.getString();

    try {
        /** validating user's input */
        if (answer == "") throw "\nNo input found , Choose 1"
        if (answer != '1') throw "\nInvalid input"

        if (answer == '1') {

            console.log("\nNew here? Press 1\nAlready registered? Press 2");

            /** storing users input */
            var answer2 = Utility.getString();

            /** validating user's input */
            if (answer == "") throw "\nNo input found , Choose 1"
            if (answer != ('1' || '2')) throw "\nInvalid input"

            if (answer2 == '1') {
                /** calling function to register company */
                companyRegistration();
            } else {
                /** calling function to ask purpose of visiting application */
                purposeCompany();
            }

        } else {
            console.log("Invalid Input");
            /** calling function again in case of invalid input */
            askViewer();
        }
        /** exception handling */
    } catch (err) {
        console.log(err);

        /** calling fucntion in case of a exception */
        askViewer();
    }
}

/**
 * @description function to register company
 */
function companyRegistration() {

    /** read company shares file */
    var data = fs.readFileSync('../jsonFiles/companySharesLL.json');
    var content = JSON.parse(data);

    for (var key in content.companies) {
        list.addLast(content.companies[key]);
    }

    console.log("Enter your company's full Name: ")
    var companyName = Utility.inputread();

    console.log("Enter a symbol for the company: ")
    var companySymbol = Utility.inputread();

    console.log("Enter what's your price per share: ")
    var price = Utility.inputread();

    var cShares = new CompanyShares();

    cShares.setName(companyName);
    cShares.setSymbol(companySymbol);
    cShares.setPrice(price);

    if (!isNaN(price)) {

        list.addLast(cShares);
        save();
    } else {
        console.log("Invalid Input!");
        companyRegistration();
    }
}

/**
 * @description function to save data
 */
function save() {

    var curr = list.head;

    var arr = [];

    while (curr) {

        arr.push(curr.item);

        curr = curr.next;
    }

    var b = { "companies": arr }

    fs.writeFileSync('../jsonFiles/companySharesLL.json', JSON.stringify(b));
    console.log("Changes have been saved successfully !!")

}

/**
 * @description function to ask compony purpose
 * 
 */
function purposeCompany() {

    console.log("\nEnter 1 to delete your data ");
    var reply = Utility.getString();

    if (reply == '1') {
        console.log("\nEnter the symbol of your company: ");
        var answer = Utility.getString();

        var data = fs.readFileSync('../jsonFiles/companySharesLL.json');
        var content = JSON.parse(data);
    
        for (var key in content.companies) {
            list.addLast(content.companies[key]);
        }
        var curr = list.head;
        var n = 0;

        while (curr) {

            n++;
            console.log(curr.item.symbol)
            if (curr.item.symbol === answer) {
                list.popIndex(n);
            }
            curr = curr.next;
        }

        save();

    } else {
        console.log("Invalid input");
    }

}
/** CALLING FUNCTION to execute the code */
askViewer();