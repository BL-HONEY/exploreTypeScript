var utility = require('../Utility/Utility');
var fs = require("fs");

var utility = new utility();

class AddressBook {

    private firstName: string = "";
    private lastName: string = "";
    private address: string = "";
    private city: string = "";
    private state: string = "";
    private zipcode: string = "";
    private phoneNumber: string = "";

    constructor() { };

    getFirstName() {
        return this.firstName;
    }

    setFirstName(firstName: string) {

        this.firstName = firstName;

    }

    getLastName() {
        return this.lastName;
    }

    setLastName(lastName: string) {

        this.lastName = lastName;

    }

    getAddress() {
        return this.address;
    }

    setAddress(address: string) {

        this.address = address;

    }

    getCity() {

        return this.city;

    }

    setCity(city: string) {

        this.city = city;
    }

    getState() {

        return this.state;
    }

    setState(state: string) {

        this.state = state;
    }

    getZipcode() {

        return this.zipcode;
    }

    setZipcode(zipcode: string) {

        this.zipcode = zipcode;
    }

    getPhoneNumber() {

        return this.phoneNumber;
    }

    setPhoneNumber(phoneNUmber: string) {

        this.phoneNumber = phoneNUmber;
    }

    registration() {
        var addressBook = utility.getDataFromJson2();
        console.log("\nWelcome to User's Registration ")
        try {

            console.log("\nPlease Enter your first name: ");
            var firstName = utility.getString();

            console.log("\nEnter your last name: ");
            var lastName = utility.getString();

            console.log("\nEnter your permanent Address (stick to house number , area): ");
            var address = utility.getString();

            console.log("\nEnter the City you live in: ");
            var city = utility.getString();

            console.log("\nEnter State ");
            var state = utility.getString();

            console.log("\nEnter ZipCode(6 digits only) ");
            var zipcode = utility.getInteger();

            if (zipcode.length != 6) throw "Invalid input for zipcode , It must be of 6 digits only"

            console.log("\nEnter your personal Phone Number(10 digits): ");
            var phoneNumber = utility.getInteger();

            if (phoneNumber.length != 10) throw "Invalid input for phone number , It should be of 10 digits only"

            this.setFirstName(firstName),
                this.setLastName(lastName),
                this.setAddress(address),
                this.setCity(city),
                this.setState(state),
                this.setZipcode(zipcode),
                this.setPhoneNumber(phoneNumber)


            var user = {

                firstname: this.getFirstName(),
                lastname: this.getLastName(),
                address: this.getAddress(),
                city: this.getCity(),
                state: this.getState(),
                zipcode: this.getZipcode(),
                contact: this.getPhoneNumber()
            }



            addressBook.users.push(user);

            console.log("\nYou are done with filling entries.\nWant to save now? Press 1 \nBack to main menu Press 2 \ndone exploring? Press 3 to leave ");
            var reply = utility.getInteger();
            try {

                if (reply < 1 || reply > 2) throw "\nInvalid input , Choose between 1 and 2"
                if (reply == "" || isNaN(reply)) throw "\nNo input found , Choose between 1 and 2"

                if (reply == '1') {
                    this.updateAddressBook(addressBook);
                    console.log("\nThanks for registring with us..\nRegistration done!\nYour Information has been successfully saved !");

                    console.log("\nPress 1 to go back to the main menu\ndone exploring? Press 2 to leave");
                    var reply2 = utility.getString();
                    if (reply2 == '1') {
                        askUser()
                    } else {
                        this.leave();
                    }
                } else
                    if (reply == '2') {
                        askUser();
                    } else {
                        console.log("\nHope you had a good experience.. \nSee you soon !!");
                        this.leave();
                    }
            } catch (err) {
                console.log(err);
                console.log("\nredirecting to registration......")
                this.registration();
            }

        } catch (err) {
            console.log(err);
            console.log("\nredirecting to registration......")
            this.registration();
        }
    }

    updateAddressBook(addressBook: string) {

        fs.writeFileSync('../jsonFiles/addressBook.json', JSON.stringify(addressBook));

    }
    leave() {
        console.log("\nleaving the app....")
        console.log("\nHope you had a good experience.. \nSee you soon !!");
        process.exit();
    }
    purposeOfUser() {
        console.log("___------USER`S DASHBOARD------___");
        console.log("\nHello User !!\nBefore you proceed furthur \nthere is some verfication which needs to be done for security purpose..\nIt will take few minutes");
        console.log("\nEnter your personal mobile number used during registration");
        var reply = utility.getInteger();

        if (this.verifyUser(reply)) {
            console.log("\nYour verification has been successfully done..");
            console.log("Tell us how can we help you ?");
            console.log("We can help you in editing your data or deleting it\nPress 1 to edit\nPress 2 to delete");
            var reply2 = utility.getString();

            if (reply2 == '1') {
                this.editUserData(reply);
            } else {
                this.deleteUser(reply);
            }
        } else {
            console.log("Phone number Invalid")
        }

    }

    verifyUser(phoneNumber: string) {
        var content = utility.getDataFromJson2();

        for (let i = 0; i < content.users.length; i++) {
            if (content.users[i].contact == phoneNumber) {
                return true;
            }

        }
        return false;

    }
    editUserData(phoneNumber: string) {

        var content = utility.getDataFromJson2();
        var index;
        for (let i = 0; i < content.users.length; i++) {

            if (content.users[i].contact === phoneNumber) {
                index = content.users.indexOf(content.users[i]);
            }
        }
        console.log(index);

        console.log("\nhi " + content.users[index].firstname + "\nYou can see your data below");
        console.log(content.users[index]);

        console.log("\nEnter value of the field you want to update: ");
        var reply = utility.getString();

        if (reply in content.users[index]) {

            console.log("\n What would you like to change it to?");
            var reply2 = utility.getString();

            content.users[index][reply] = reply2;

            this.updateAddressBook(content);
        } else {
            console.log("field not found");
        }
    }

    deleteUser(phoneNumber: string) {

        var content = utility.getDataFromJson2();
        var index;
        for (let i = 0; i < content.users.length; i++) {

            if (content.users[i].contact === phoneNumber) {
                index = content.users.indexOf(content.users[i]);
            }
        }

        console.log("\nhi " + content.users[index].firstname + "\nYou can see your data which you want to delete below");
        console.log(content.users[index]);

        console.log("\nAre you sure you want to delete ?\nPress 1 for Yes Press 2 to go to the main menu\nPress 3 to stop exploring");
        var reply = utility.getString();

        try {

            //if (reply < 1 || reply > 3) throw "\nInvalid input , Choose between 1 ,2 and 3"
            if (reply == "" || isNaN(reply)) throw "\nNo input found , Choose between 1 ,2 and 3"


            if (reply == '1') {
                content.users.splice(index, 1);
                console.log("\nDo you want to apply changes ? \nPress 1 for Yes\nPress 2 to go the previous menu \nPress 3 to go to the main menu\nPress 4 to leave the App");
                var answer = utility.getString();

                if (answer == '1') {
                    this.updateAddressBook(content);
                    console.log("\nData has been updated..\nredirecting to main meanu");
                    askUser();
                } else if (answer == '2') {
                    console.log("\nredirecting to previous menu..");
                    this.purposeOfUser();
                } else if (answer == '3') {
                    console.log("\nredirecting to main menu..");
                    askUser();

                } else {
                    this.leave();
                }

            } else if (reply == '2') {
                console.log("\nredirecting to main menu..");
                askUser();
            } else {
                this.leave();
            }
        } catch (err) {
            console.log(err);
            this.purposeOfUser();
        }
    }

    sortByName() {
        var content = utility.getDataFromJson2();

        var obj = content.users;

        obj.sort(

            function (a: any, b: any) {

                if (a.firstname == b.firstName)
                    return 0;

                if (a.firstname < b.firstname)
                    return -1;

                if (a.firstName > b.firstname)
                    return 1;
            }

        )
        this.updateAddressBook(content);
        var data = utility.getDataFromJson2();
        console.log("\n", data);
    }

    sortByZip() {
        var content = utility.getDataFromJson2();
        var obj = content.users;
        obj.sort(

            function (a: any, b: any) {

                if (a.zipcode == b.zipcode)
                    return 0;

                if (a.zipcode < b.zipcode)
                    return -1;

                if (a.zipcode > b.zipcode)
                    return 1;
            }

        )
        this.updateAddressBook(content);
        var data = utility.getDataFromJson2();
        console.log("\n", data);

    }

    ownerPage() {

        console.log("\n---Welcome to Owner's Dashboard---");

        console.log("\nView all records here\nEnter 1 to view records sorted by First Name\nEnter 2 to view records sorted by Zipcode\nEnter 3 to go back to the main menu\nEnter 4 to leave the App ");
        var reply = utility.inputString();
        if (reply == '1') {
            this.sortByName();
            console.log("\nredirecting to main menu..");
            askUser();
        } else if (reply == '2') {
            this.sortByZip();
            console.log("\nredirecting to main menu..");
            askUser();
        } else if (reply == '3') {
            console.log("\nredirecting to main menu..");
            askUser();
        } else {
            this.leave();
        }
    }
}

var str = "This address book holds a collection of entries. \nEach recording a person's \nFirst and Last names \nAddress \nCity \nState \nZip \nand Phone number";
var addressBook = new AddressBook();

function askUser() {
    console.log("\n----------------***ADDRESS BOOK***----------------\n" + str);

    console.log("\nAlready registered ? Enter 1  \nNew User ? Enter 2 to register \nEnter 3 to stop exploring \nEnter 4 Owner Login");
    var reply = utility.getInteger();
    reply = Number(reply);
    try {
        if (reply < 1 || reply > 2) throw "\nInvalid input , Choose between 1 and 2"
        if (reply == "" || isNaN(reply)) throw "\nNo input found , Choose between 1 and 2"

        if (reply == 1) {
            addressBook.purposeOfUser();
        } else if (reply == 2) {
            addressBook.registration();
        } else if (reply == 3) {
            addressBook.leave();
        } else {
            addressBook.ownerPage();
        }

    } catch (err) {
        console.log(err);
        console.log("\nredirecting to home..... ")
        askUser();
    }
}
askUser();