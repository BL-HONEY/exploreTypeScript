var utility = require('../Utility/Utility');

var utility = new utility();

var fs = require("fs");

/***************************************************************************** 
* 
*  Purpose         : programme is used to manage a list of
*                    Doctors associated with the Clinique. This also manages the list of patients who use the
*                    clinique. It manages Doctors by Name, Id, Specialization and Availability (AM, PM or
*                    both). It manages Patients by Name, ID, Mobile Number and Age. The Program allows
*                    users to search Doctor by name, id, Specialization or Availability..
* 
*  @description    
* 
*  @file           : Clinique.ts
*  @overview       : programme is used to manage a list of
*                    Doctors associated with the Clinique. This also manages the list of patients who use the
*                    clinique. It manages Doctors by Name, Id, Specialization and Availability (AM, PM or both). 
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 28-01-2019
*
******************************************************************************/
/**
 * @description class Clinique
 * 
 * @class Clinique
 * @purpose This programme is used to manage a list of
 *  Doctors associated with the Clinique. This also manages the list of patients who use the
 *   clinique.
 */
class Clinique {

    /**
     * instance member pName of string type 
     * @access private
     */
    private pName: string = "";

    /**
     * instance member phoneNumber of number type 
     * @access private
     */
    private phoneNumber: number = 0;

    /**
     * instance member pAge of number type
     * @access private 
     */
    private pAge: number = 0;

    /**
     * @description getter function to return patient name
     * @returns {string} patient's name
     */
    getPatientName(): string {
        return this.pName;
    }

    /**
     * @description setter function to set value of patient name
     * @param {string} pName 
     */
    setPatientName(pName: string) {
        this.pName = pName;
    }

    /**
     * @description getter function to return patient's phone number
     * @returns {string} patient's phone number
     */
    getPatientPhoneNum(): number {
        return this.phoneNumber;
    }

    /**
     * @description setter function to set phone number of patient
     * @param {number} phoneNum 
     */
    setPatientPhoneNum(phoneNum: number) {
        this.phoneNumber = phoneNum;
    }

    /**
     * @description getter function to return patient name
     * @returns {string} patient's name
     */
    getPatientAge(): number {
        return this.pAge;
    }

    /**
     * @description setter function to set patient's age
     * @param age 
     */
    setPatientAge(age: number) {
        this.pAge = age;
    }

    /**
     * @description member function to register a new visiting Patieent
     */
    registerPatient() {

        /** read patient file */
        var patientData: any = utility.getDataFromJson3('patient');

        /** variable to get number of patients already registered */
        var size: number = patientData.size;

        console.log("\n Please , Enter your name: ");
        
        try{
        /** varaible to store patient's name  */
        var uname: string = utility.getString();
        
        if(uname = "") throw "name required , empty strinf found"
            
        console.log("Enter your phone number: ");
        
        /** variable to store patient's phone number */
        var phoneNum: number = utility.getInteger();
       
        /** validating phone number */
        if(phoneNum.toString().length != 10)throw "Phone number must be of 10 digits"
        if(phoneNum.toString() == "")throw "Phone number expected"

        console.log("Enter your age: ");

        /** varaible to store patient's age */
        var uAge: number = utility.getInteger();
        
        if(uAge.toString() == "")throw "Age can't be left unfilled"
        /**
         * calling setter function to set patient details
         */
        this.setPatientName(uname);
        this.setPatientPhoneNum(phoneNum);
        this.setPatientAge(uAge);

        /**
         * exception handling
         */
         
            /** check if phoneNUm and uAge is valid */
            if (isNaN(phoneNum) || isNaN(uAge)) throw "Invalid input , Please Try again !"

            /**
             * create patient data , further to be stored in json 
             */
            var patient = {
                name: this.getPatientName(),
                id: size,
                phone: this.getPatientPhoneNum(),
                age: this.getPatientAge(),
                doc: " "
            }
            /** push patient's data to json */
            patientData.patients.push(patient);

            /** Increase sixe as one new patient has been registered */
            patientData.size++;

            /** call function to update details  */
            this.updatePatient(patientData);

            console.log("\n Do you want to send a request to book an appointment ? ");

            /** store user reply in a variable(reply) */
            var reply: any = utility.getString();

            /** validate user's reply */
            if (reply.startsWith('y') || reply.startsWith('Y')) {

                /** call function if reply is yes */
                this.selectDoctor(Number(size));
            } else {
                console.log("Thank you for registering.. See you soon");

            }
        } catch (err) {

            console.log(err);
            /** call registerPatient() in case of an error */
            this.registerPatient();
        }
    }
    /**
     * @description function to ask user which of the available doctor he needs
     * @param {number} pId 
     */
    selectDoctor(pId: number) {
        
        try {
        /** call function to display all doctors */
        this.displayAllDoctors();

        /** store docotors data in docData */
        var docData = utility.getDataFromJson3('doc');

        console.log("Choose a Doctor using his/her ID as per your need: ");

        /** Ask user for doctor ID */
        var docID = utility.getInteger();


        /**
          * exception handling
          */
        
            /** check if doctor ID is a valid number type */
            if(docID.toString() == "") throw "\nDoctor ID can't be left unfilled"
            if (isNaN(docID)) throw "\nInvalid Doctor ID , Choose only from available doctors"

            /** check if doctor is a valid one or not */
            if (docID > docData.doctors.length) throw "\nEntered ID is incorrect , Choose only from the available options "

            /** Ask user for an appointment date */
            console.log("\nWhen do you wish to visit him/her? Please enter a Date(DD/MM/YY): ")

            /** data variable to store appointment date */
            var date: string = utility.getString();

            if(date == "")throw "\nDate field can't be left unfilled"

            /** validating date format */
            if (!/\d\d\/\d\d\/\d\d/.test(date)) throw "Date format is incorrect , Please enter a Date(DD/MM/YY)"

            /** checking availabitlity of the doctor */
            if (this.checkAvailability(docID, date)) {

                /** Telling user about doctor's availabilty and asking to confirm booking appointment*/
                console.log("\nDoctor is available.. want to book an appointment? ");

                /** storing  */
                var reply: any = utility.getString();

                var dName = this.getDoctorName(docID);

                if (reply.startsWith('y') || reply.startsWith('Y')) {

                    this.bookAppointment(pId, docID, dName, date);
                } else {
                    console.log("Thanks for visiting.. \n Hope we served you best !!");
                }
            }
            else {
                console.log("\nConcerned Doctor is unavailable on your chosen date. Please ,Choose another appointment date..");
                this.selectDoctor(pId);
            }

        } catch (err) {
            console.log(err);
            this.selectDoctor(pId);
        }
    }
    
    /**
     * @description function to  book an appointment for the patient
     * @param {number} pId 
     * @param {number} dId 
     * @param {string} dName 
     * @param {string} date 
     */
    bookAppointment(pId: number, dId: number, dName: string, date: string) {
        
        /** read doctor file */
        var docData = utility.getDataFromJson3('doc');

        /** read patient file */
        var patientData = utility.getDataFromJson3('pat');
        
        console.log("patientdata is : ", patientData);
        console.log("patient ID: ", pId);
        
        
        /** checking doctor reserved dates */
        if (!docData.doctors[dId - 1].appointments.test.includes(date)) {

            docData.doctors[dId - 1].appointments[date] = [];
        }
        docData.doctors[dId - 1].appointments[date].push(pId);

        docData.doctors[dId - 1].appointments.test.push(date);
        
        /** storing appointed doctor info to patient file */
        patientData.patients[pId - 1].doc = "Dr. " + dName + " on " + date;
        
        /** writing to doctor file */
        fs.writeFileSync('../jsonFiles/Doctors.json', JSON.stringify(docData));

        /** writing to patient file */
        fs.writeFileSync('../jsonFiles/Patients.json', JSON.stringify(patientData));

        console.log("You appointment have been booked successful !\nDate: " + date);

    }

    /**
     * @description function to update patient file
     * @param data 
     */
    updatePatient(data: any) {


        fs.writeFileSync('../jsonFiles/Patients.json', JSON.stringify(data));

    }
   
    /**
     * @description get doctor's name
     * @param id {number}
     */
    getDoctorName(id: number) {

        var docData = utility.getDataFromJson3('doc');

        return docData.doctors[id - 1].name;
    }
    
    /**
     * @description function to ask user's purpose
     */
    purposeUser() {
        
        try {
         var data = this.displayAllPatients();
   
        console.log("\nHello User! Choose concerned patient ID if you want to change or previous appointment taken");
        var patientID = utility.getInteger();

        
            /** validating patient ID */
            if(patientID.toString() == "") throw "Patient Id cant be left unfilled"
            if (isNaN(patientID)) throw "Invalid Patient ID , Please , Choose registered one only"
            if (patientID > data) throw "Invalid Patient ID , Please , Choose registered one only"
            
            /** calling fucntion to select doctor */
            this.selectDoctor(Number(patientID));
        } catch (err) {
            console.log(err);
            this.purposeUser();
        }
    }

    /**
     * @description checking whether the doctor is avialable on a particular date
     * @param id {number}
     * @param date {number}
     */
    checkAvailability(id: number, date: string) {
        
        /** read doctor file */
        var docData = utility.getDataFromJson3('doc');
        
        /** checking doctor's availability */
        if (!docData.doctors[id - 1].appointments.test.includes(date)) {

            return true;
        }
        else if (docData.doctors[id - 1].appointments[date].length <= 5) {

            return true;
        } else {

            return false;
        }
    }

    /**
     * @description function to display all doctors
     */
    displayAllDoctors() {

        // Reading Doctors file.
        var d = utility.getDataFromJson3('doc');

        // For loop to run till all the doctor's are printed.
        for (var i = 0; i < d.doctors.length; i++) {

            // Printing doctor's id, name & speciality.
            console.log(d.doctors[i].id + ". " + d.doctors[i].name + " (" + d.doctors[i].special + ")");
        }
    }

    /**
     * @description fucntion to display all registered patients
     * @returns {number} number of patients
     */
    displayAllPatients() {

        /** reading patient file */
        var data = utility.getDataFromJson3('pat');

        for (let index = 0; index < data.size - 1; index++) {

            console.log(data.patients[index].id + ". " + data.patients[index].name + "  " + data.patients[index].age +
                " " + data.patients[index].doc);
        }
        return data.size;
    }

}

/** creating one clinique type object */
var clinique = new Clinique();

/**
 * @description function for user Input procedure
 */
function userInput() {
    console.log("*******Welcome to PUBLIC CLINIQUE*******\n");

    /** asking if the viewer is patient or user */
    console.log("Already registered? Choose User else go for Patient \n");

    console.log("\n1. Patient \n2. User\n");

    /** storing viewer's reply in reply variable  */
    var reply: string = utility.getString();

    try {
        if (reply == "") throw "No input found , Choose between 1 and 2"

        if (reply == '1') {

            /** calling registerPatient() if reply is patient */
            clinique.registerPatient();

        } else {

            /**calling purposeUser() if viewer is a user */
            clinique.purposeUser();
        }

    } catch (err) {
        console.log(err);
        /** in case of any exception call userInput()  */
        userInput();
    }
}
/** calling function to execute the code */
userInput();