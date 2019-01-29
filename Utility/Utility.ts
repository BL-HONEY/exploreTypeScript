var read = require('readline-sync');
var fs = require("fs");


class Utility{
    constructor(){}

    getString(): string{
    
        let value = read.question("");
        return value;

    }

    getInteger(): number{

        let value = read.question("");
        return value;

    }
  
    replaceString( name : string, mob : string) {
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

    getDataFromJson1(found:string) {


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
        }else{
            console.log("File not found");
        }
    }

    getDataFromJson2() {

        var data = fs.readFileSync('../jsonFiles/addressBook.json');
        var content = JSON.parse(data);
        return content;
    
    }

    getDataFromJson3(toRead : any) {

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

    writeInJson(found:string, data:string) {
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

     writeDataToJson2(userData : any) {
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

    writeDataToJson3(userData : any) {
        try{
            if(userData == undefined) throw "No data found"
            var  converted : any = JSON.stringify(userData);
            console.log("\nJSON String: \n"+ converted);
    
        }catch(err) {
            console.log(err);
        }
    
        fs.writeFileSync('../jsonFiles/stockReport.json', converted);
       
    }
    
     getDataFromJson4() {
    
        var data = fs.readFileSync('../jsonFiles/inventory.json');
        var content = JSON.parse(data);
        return content;
    }
}

export = Utility;