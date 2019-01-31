/** requiring utility class */
var utility = require('../Utility/Utility');
/** including file sysytem module */
var fs = require("fs");
/** create obejct of utility class */
var utility = new utility();
/*****************************************************************************
*
*  Purpose         : a program that can be used to maintain an address book. An address book
*                    holds a collection of entries, each recording a person's first and last names, address, city, state, zip, and
*                    phone number.
*
*  @description
*
*  @file           : AddressBook.ts
*  @overview       : a program that can be used to maintain an address book. An address book
*                    holds a collection of entries, each recording a person's first and last names, address, city, state, zip, and
*                    phone number.
*
*  @author         : Honey
*  @version        : 1.0
*  @since          : 28-01-2019
*
******************************************************************************/
/**
 * @description class AddressBook
 *
 * @class AddressBook
 * @purpose This programme to maintain an address book. An address book
 * holds a collection of entries, each recording a person's first and last names, address, city, state, zip, and
 * phone number.
 */
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        /**
         * instance member firstName of string type
         * @access private
         */
        this.firstName = "";
        /**
         * instance member lastName of string type
         * @access private
         */
        this.lastName = "";
        /**
        * instance member addess of string type
        * @access private
        */
        this.address = "";
        /**
        * instance member city of string type
        * @access private
        */
        this.city = "";
        /**
        * instance member state of string type
        * @access private
        */
        this.state = "";
        /**
        * instance member zipcode of string type
        * @access private
        */
        this.zipcode = "";
        /**
        * instance member phoneNumber of string type
        * @access private
        */
        this.phoneNumber = "";
    }
    ;
    /**
     * @description getter function to return first name
     * @returns {string} first name
     */
    AddressBook.prototype.getFirstName = function () {
        return this.firstName;
    };
    /**
     * @description setter fucntion to set firstname
     * @param {string} firstName
     */
    AddressBook.prototype.setFirstName = function (firstName) {
        this.firstName = firstName;
    };
    /**
     * @description getter function to return last name
     * @returns {string} last name
     */
    AddressBook.prototype.getLastName = function () {
        return this.lastName;
    };
    /**
     * @description setter function to set last name
     * @param {string} lastName
     */
    AddressBook.prototype.setLastName = function (lastName) {
        this.lastName = lastName;
    };
    /**
     * @description getter function to return address
     * @returns {string} address
     */
    AddressBook.prototype.getAddress = function () {
        return this.address;
    };
    /**
     * @description setter function set address
     * @param {string} address
     */
    AddressBook.prototype.setAddress = function (address) {
        this.address = address;
    };
    /**
     * @description getter function to return city
     * @returns {string} city
     */
    AddressBook.prototype.getCity = function () {
        return this.city;
    };
    /**
     * @description setter function set city
     * @param {string} city
     */
    AddressBook.prototype.setCity = function (city) {
        this.city = city;
    };
    /**
     * @description getter function to return state
     * @returns {string} state
     */
    AddressBook.prototype.getState = function () {
        return this.state;
    };
    /**
     * @description setter function to set state
     * @param {string} state
     */
    AddressBook.prototype.setState = function (state) {
        this.state = state;
    };
    /**
     * @description getter function to return zipcode
     * @returns {string} zipcode
     */
    AddressBook.prototype.getZipcode = function () {
        return this.zipcode;
    };
    /**
     * @description setter function to set zipcode
     * @param {number} zipcode
     */
    AddressBook.prototype.setZipcode = function (zipcode) {
        this.zipcode = zipcode;
    };
    /**
     * @description getter function to return phone number
     * @returns {string} phone number
     */
    AddressBook.prototype.getPhoneNumber = function () {
        return this.phoneNumber;
    };
    /**
     * @description setter function to set phone number
     * @param phoneNUmber
     */
    AddressBook.prototype.setPhoneNumber = function (phoneNUmber) {
        this.phoneNumber = phoneNUmber;
    };
    /**
     * @description function to register a new user
     */
    AddressBook.prototype.registration = function () {
        /** read addressbook file */
        var addressBook = utility.getDataFromJson2();
        console.log("\nWelcome to User's Registration ");
        try {
            /** asking user's first name */
            console.log("\nPlease Enter your first name: ");
            /** storing first name  */
            var firstName = utility.getString();
            if (firstName == "")
                throw "\nfirst name required , empty string found";
            console.log("\nEnter your last name: ");
            /** storing last name */
            var lastName = utility.getString();
            if (lastName == "")
                throw "\nlast name required , empty string found";
            console.log("\nEnter your permanent Address (stick to house number , area): ");
            /** storing address */
            var address = utility.getString();
            if (address == "")
                throw "\naddress required , empty string found";
            console.log("\nEnter the City you live in: ");
            /** storing city */
            var city = utility.getString();
            if (city == "")
                throw "\ncity required , empty string found";
            console.log("\nEnter State ");
            /** storing state */
            var state = utility.getString();
            if (state == "")
                throw "\nstate required , empty string found";
            console.log("\nEnter ZipCode(6 digits only) ");
            /** storing zipcode */
            var zipcode = utility.getInteger();
            if (zipcode.length != 6)
                throw "Invalid input for zipcode , It must be of 6 digits only";
            if (zipcode == "")
                throw "\nzipcode required , empty string found";
            console.log("\nEnter your personal Phone Number(10 digits): ");
            var phoneNumber = utility.getInteger();
            if (phoneNumber.length != 10)
                throw "Invalid input for phone number , It should be of 10 digits only";
            if (phoneNumber == "")
                throw "\nphone number required , empty string found";
            /**
             * calling setter function to set values for all fields (firstname , lastnaame , address,city ,state ,zipcode, phone number)
             */
            this.setFirstName(firstName),
                this.setLastName(lastName),
                this.setAddress(address),
                this.setCity(city),
                this.setState(state),
                this.setZipcode(zipcode),
                this.setPhoneNumber(phoneNumber);
            /**
             * user object to store values
             */
            var user = {
                /**
                 * storing values using getter functions
                 */
                firstname: this.getFirstName(),
                lastname: this.getLastName(),
                address: this.getAddress(),
                city: this.getCity(),
                state: this.getState(),
                zipcode: this.getZipcode(),
                contact: this.getPhoneNumber()
            };
            /** push values to json file */
            addressBook.users.push(user);
            console.log("\nYou are done with filling entries.\nWant to save now? Press 1 \nBack to main menu Press 2 \ndone exploring? Press 3 to leave ");
            var reply = utility.getString();
            try {
                /** validating user's input */
                if (reply == "")
                    throw "\nInvalid input , Choose between 1 and 2";
                /** conditionals to handle user request*/
                if (reply == '1') {
                    /** call function to update the addrsss book */
                    this.updateAddressBook(addressBook);
                    console.log("\nThanks for registring with us..\nRegistration done!\nYour Information has been successfully saved !");
                    console.log("\nPress 1 to go back to the main menu\ndone exploring? Press 2 to leave ");
                    var reply2 = utility.getString();
                    if (reply2 == "")
                        throw "\nInvalid input , Choose between 1 and 2";
                    if (reply2 == '1') {
                        /** call function to handle user request */
                        askUser();
                    }
                    else {
                        /** leave the application */
                        this.leave();
                    }
                }
                else 
                /** conditionals to handle user request */
                if (reply == '2') {
                    /** call function to handle user request */
                    askUser();
                }
                else {
                    console.log("\nHope you had a good experience.. \nSee you soon !!");
                    this.leave();
                }
                /** handling exceptions */
            }
            catch (err) {
                console.log(err);
                console.log("\nredirecting to registration......");
                /** calling registration again */
                this.registration();
            }
        }
        catch (err) {
            console.log(err);
            console.log("\nredirecting to registration......");
            /**calling registration function */
            this.registration();
        }
    };
    /**
     * @description function to update addressbook
     * @param {string} addressBook
     */
    AddressBook.prototype.updateAddressBook = function (addressBook) {
        /**
         * writing to the file
         */
        fs.writeFileSync('../jsonFiles/addressBook.json', JSON.stringify(addressBook));
    };
    /**
     * @description function to exit the process
     */
    AddressBook.prototype.leave = function () {
        console.log("\nleaving the app....");
        console.log("\nHope you had a good experience.. \nSee you soon !!");
        process.exit();
    };
    /**
     *@description function to handle user
     */
    AddressBook.prototype.purposeOfUser = function () {
        console.log("___------USER`S DASHBOARD------___");
        console.log("\nHello User !!\nBefore you proceed furthur \nthere is some verfication which needs to be done for security purpose..\nIt will take few minutes");
        console.log("\nEnter your personal mobile number used during registration");
        try {
            var reply = utility.getString();
            if (reply == "")
                throw "phone number required , no value found";
            /** varifying user */
            if (this.verifyUser(reply)) {
                console.log("\nYour verification has been successfully done..");
                console.log("Tell us how can we help you ?");
                console.log("We can help you in editing your data or deleting it\nPress 1 to edit\nPress 2 to delete");
                var reply2 = utility.getString();
                /** validating user's reply */
                if (reply2 == "")
                    throw "choose between 1 and 2";
                if (reply2 != '1' || reply2 != '2')
                    throw "choose between 1 and 2";
                /** conditionals to handle user request */
                if (reply2 == '1') {
                    /** calling edit function */
                    this.editUserData(reply);
                }
                else {
                    /** calling function to delete user */
                    this.deleteUser(reply);
                }
            }
            else {
                console.log("Phone number Invalid");
            }
        }
        catch (err) {
            console.log(err);
            this.purposeOfUser();
        }
    };
    /**
     * @description function to verify user
     * @param {string} phoneNumber
     * @returns {boolean} true or false
     */
    AddressBook.prototype.verifyUser = function (phoneNumber) {
        /** reading addressbook file */
        var content = utility.getDataFromJson2();
        /** look for the phone number to verify user */
        for (var i = 0; i < content.users.length; i++) {
            if (content.users[i].contact == phoneNumber) {
                return true;
            }
        }
        /** phone number not found */
        return false;
    };
    /**
     * @description function to edit user data
     * @param {string} phoneNumber
     */
    AddressBook.prototype.editUserData = function (phoneNumber) {
        /** read addressbook file */
        var content = utility.getDataFromJson2();
        var index;
        /** looking for contact details */
        for (var i = 0; i < content.users.length; i++) {
            if (content.users[i].contact === phoneNumber) {
                index = content.users.indexOf(content.users[i]);
            }
        }
        /** printing found user data */
        console.log("\nhi " + content.users[index].firstname + "\nYou can see your data below");
        console.log(content.users[index]);
        try {
            console.log("\nEnter value of the field you want to update: ");
            var reply = utility.getString();
            if (reply in content.users[index]) {
                console.log("\n What would you like to change it to?");
                var reply2 = utility.getString();
                if (reply2 == "")
                    throw "some value is expected , found no input";
                content.users[index][reply] = reply2;
                this.updateAddressBook(content);
            }
            else {
                console.log("field not found");
            }
        }
        catch (err) {
            console.log(err);
            this.editUserData(phoneNumber);
        }
    };
    /**
     * @description function to handle delete user request
     * @param {string} phoneNumber
     */
    AddressBook.prototype.deleteUser = function (phoneNumber) {
        /** read addressbook file */
        var content = utility.getDataFromJson2();
        var index;
        for (var i = 0; i < content.users.length; i++) {
            if (content.users[i].contact === phoneNumber) {
                /** find index of required usee */
                index = content.users.indexOf(content.users[i]);
            }
        }
        console.log("\nhi " + content.users[index].firstname + "\nYou can see your data which you want to delete below");
        console.log(content.users[index]);
        console.log("\nAre you sure you want to delete ?\nPress 1 for Yes Press 2 to go to the main menu\nPress 3 to stop exploring");
        var reply = utility.getString();
        try {
            if (reply == "" || isNaN(reply))
                throw "\nNo input found , Choose between 1 ,2 and 3";
            if (reply == '1') {
                content.users.splice(index, 1);
                console.log("\nDo you want to apply changes ? \nPress 1 for Yes\nPress 2 to go the previous menu \nPress 3 to go to the main menu\nPress 4 to leave the App");
                var answer = utility.getString();
                if (answer == '1') {
                    this.updateAddressBook(content);
                    console.log("\nData has been updated..\nredirecting to main meanu");
                    askUser();
                }
                else if (answer == '2') {
                    console.log("\nredirecting to previous menu..");
                    this.purposeOfUser();
                }
                else if (answer == '3') {
                    console.log("\nredirecting to main menu..");
                    askUser();
                }
                else {
                    this.leave();
                }
            }
            else if (reply == '2') {
                console.log("\nredirecting to main menu..");
                askUser();
            }
            else {
                this.leave();
            }
        }
        catch (err) {
            console.log(err);
            this.purposeOfUser();
        }
    };
    /**
     * @description sort file by name
     */
    AddressBook.prototype.sortByName = function () {
        /** read users file */
        var content = utility.getDataFromJson2();
        /** storing data in obj */
        var obj = content.users;
        /** calling sort to sort data */
        obj.sort(function (a, b) {
            if (a.firstname == b.firstName)
                return 0;
            if (a.firstname < b.firstname)
                return -1;
            if (a.firstName > b.firstname)
                return 1;
        });
        /** calling function to update the data */
        this.updateAddressBook(content);
        var data = utility.getDataFromJson2();
        console.log("\n", data);
    };
    /**
     * @description function to sort by zipcode
     */
    AddressBook.prototype.sortByZip = function () {
        /** reading user file */
        var content = utility.getDataFromJson2();
        var obj = content.users;
        /** calling sort function */
        obj.sort(function (a, b) {
            if (a.zipcode == b.zipcode)
                return 0;
            if (a.zipcode < b.zipcode)
                return -1;
            if (a.zipcode > b.zipcode)
                return 1;
        });
        /** calling function to update addressbook */
        this.updateAddressBook(content);
        var data = utility.getDataFromJson2();
        console.log("\n", data);
    };
    /**
     * @description owner function to sort data
     */
    AddressBook.prototype.ownerPage = function () {
        console.log("\n---Welcome to Owner's Dashboard---");
        console.log("\nView all records here\nEnter 1 to view records sorted by First Name\nEnter 2 to view records sorted by Zipcode\nEnter 3 to go back to the main menu\nEnter 4 to leave the App ");
        var reply = utility.inputString();
        if (reply == '1') {
            this.sortByName();
            console.log("\nredirecting to main menu..");
            askUser();
        }
        else if (reply == '2') {
            this.sortByZip();
            console.log("\nredirecting to main menu..");
            askUser();
        }
        else if (reply == '3') {
            console.log("\nredirecting to main menu..");
            askUser();
        }
        else {
            this.leave();
        }
    };
    return AddressBook;
}());
var str = "This address book holds a collection of entries. \nEach recording a person's \nFirst and Last names \nAddress \nCity \nState \nZip \nand Phone number";
var addressBook = new AddressBook();
/**
 * @description main function to execute the program
 */
function askUser() {
    console.log("\n----------------***ADDRESS BOOK***----------------\n" + str);
    console.log("\nAlready registered ? Enter 1  \nNew User ? Enter 2 to register \nEnter 3 to stop exploring \nEnter 4 Owner Login");
    var reply = utility.getInteger();
    try {
        if (reply < 1 || reply > 2)
            throw "\nInvalid input , Choose between 1 and 2";
        if (reply == "" || isNaN(reply))
            throw "\nNo input found , Choose between 1 and 2";
        if (reply == 1) {
            addressBook.purposeOfUser();
        }
        else if (reply == 2) {
            addressBook.registration();
        }
        else if (reply == 3) {
            addressBook.leave();
        }
        else {
            addressBook.ownerPage();
        }
    }
    catch (err) {
        console.log(err);
        console.log("\nredirecting to home..... ");
        askUser();
    }
}
/** calling askUser() to execute the program */
askUser();
