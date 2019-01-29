"use strict";
var utility = require('../Utility/Utility');
var utility = new utility();
var fs = require("fs");
var Clinique = /** @class */ (function () {
    function Clinique() {
        this.pName = "";
        this.phoneNumber = 0;
        this.pAge = 0;
    }
    Clinique.prototype.getPatientName = function () {
        return this.pName;
    };
    Clinique.prototype.setPatientName = function (pName) {
        this.pName = pName;
    };
    Clinique.prototype.getPatientPhoneNum = function () {
        return this.phoneNumber;
    };
    Clinique.prototype.setPatientPhoneNum = function (phoneNum) {
        this.phoneNumber = phoneNum;
    };
    Clinique.prototype.getPatientAge = function () {
        return this.pAge;
    };
    Clinique.prototype.setPatientAge = function (age) {
        this.pAge = age;
    };
    Clinique.prototype.registerPatient = function () {
        var patientData = utility.getDataFromJson3('patient');
        var size = patientData.size;
        console.log("\n Please , Enter your name: ");
        var uname = utility.getString();
        console.log("Enter your phone number: ");
        var phoneNum = utility.getInteger();
        console.log("Enter your age: ");
        var uAge = utility.getInteger();
        this.setPatientName(uname);
        this.setPatientPhoneNum(phoneNum);
        this.setPatientAge(uAge);
        try {
            if (isNaN(phoneNum) || isNaN(uAge))
                throw "Invalid input , Please Try again !";
            var patient = {
                name: this.getPatientName(),
                id: size,
                phone: this.getPatientPhoneNum(),
                age: this.getPatientAge(),
                doc: " "
            };
            patientData.patients.push(patient);
            patientData.size++;
            this.updatePatient(patientData);
            console.log("\n Do you want to send a request to book an appointment ? ");
            var reply = utility.getString();
            if (reply.startsWith('y') || reply.startsWith('Y')) {
                this.selectDoctor(Number(size));
            }
            else {
                console.log("Thank you for registering.. See you soon");
            }
        }
        catch (err) {
            console.log(err);
            this.registerPatient();
        }
    };
    Clinique.prototype.selectDoctor = function (pId) {
        this.displayAllDoctors();
        var docData = utility.getDataFromJson3('doc');
        console.log("Choose a Doctor using his/her ID as per your need: ");
        var docID = utility.getInteger();
        try {
            if (isNaN(docID))
                throw "Invalid Doctor ID , Choose only from available doctors";
            if (docID > docData.doctors.length)
                throw "Entered ID is incorrect , Choose only from the available options ";
            console.log("When do you wish to visit him/her? Please enter a Date(DD/MM/YY): ");
            var date = utility.getString();
            if (!/\d\d\/\d\d\/\d\d/.test(date))
                throw "Date format is incorrect , Please enter a Date(DD/MM/YY)";
            if (this.checkAvailability(docID, date)) {
                console.log("Doctor is available.. want to book an appointment? ");
                var reply = utility.getString();
                var dName = this.getDoctorName(docID);
                if (reply.startsWith('y') || reply.startsWith('Y')) {
                    this.bookAppointment(pId, docID, dName, date);
                }
                else {
                    console.log("Thanks for visiting.. \n Hope we served you best !!");
                }
            }
            else {
                console.log("Concerned Doctor is unavailable on your chosen date. Please ,Choose another appointment date..");
                this.selectDoctor(pId);
            }
        }
        catch (err) {
            console.log(err);
            this.selectDoctor(pId);
        }
    };
    Clinique.prototype.bookAppointment = function (pId, dId, dName, date) {
        var docData = utility.getDataFromJson3('doc');
        var patientData = utility.getDataFromJson3('pat');
        if (!docData.doctors[dId - 1].appointments.test.includes(date)) {
            docData.doctors[dId - 1].appointments[date] = [];
        }
        docData.doctors[dId - 1].appointments[date].push(pId);
        docData.doctors[dId - 1].appointments.test.push(date);
        patientData.patients[pId - 1].docData = "Dr. " + dName + " on " + date;
        fs.writeFileSync('../jsonFiles/Doctors.json', JSON.stringify(docData));
        fs.writeFileSync('../jsonFiles/Patients.json', JSON.stringify(patientData));
        console.log("You appointment have been booked successful !\nDate: " + date);
    };
    Clinique.prototype.updatePatient = function (data) {
        fs.writeFileSync('../jsonFiles/Patients.json', JSON.stringify(data));
    };
    Clinique.prototype.getDoctorName = function (id) {
        var docData = utility.getDataFromJson3('doc');
        return docData.doctors[id - 1].name;
    };
    Clinique.prototype.purposeUser = function () {
        var data = this.displayAllPatients();
        console.log("Hello User! Choose concerned patient ID if you want to change or previous appointment taken");
        var patientID = utility.getInteger();
        try {
            if (isNaN(patientID))
                throw "Invalid Patient ID , Please , Choose registered one only";
            if (patientID > data)
                throw "Invalid Patient ID , Please , Choose registered one only";
            this.selectDoctor(Number(patientID));
        }
        catch (err) {
            console.log(err);
            this.purposeUser();
        }
    };
    Clinique.prototype.checkAvailability = function (id, date) {
        var docData = utility.getDataFromJson3('doc');
        if (!docData.doctors[id - 1].appointments.test.includes(date)) {
            return true;
        }
        else if (docData.doctors[id - 1].appointments[date].length <= 5) {
            return true;
        }
        else {
            return false;
        }
    };
    Clinique.prototype.displayAllDoctors = function () {
        // Reading Doctors file.
        var d = utility.getDataFromJson3('doc');
        // For loop to run till all the doctor's are printed.
        for (var i = 0; i < d.doctors.length; i++) {
            // Printing doctor's id, name & speciality.
            console.log(d.doctors[i].id + ". " + d.doctors[i].name + " (" + d.doctors[i].special + ")");
        }
    };
    Clinique.prototype.displayAllPatients = function () {
        var data = utility.getDataFromJson3('pat');
        for (var index = 0; index < data.size - 1; index++) {
            console.log(data.patients[index].id + ". " + data.patients[index].name + "  " + data.patients[index].age +
                " " + data.patients[index].doc);
        }
        return data.size;
    };
    return Clinique;
}());
var clinique = new Clinique();
function userInput() {
    console.log("*******Welcome to PUBLIC CLINIQUE*******\n");
    console.log("Already registered? Choose User else go for Patient \n");
    console.log("\n1. Patient \n2. User\n");
    var reply = utility.getInteger();
    try {
        if (reply < 1 && reply > 2)
            throw "Invalid input , Choose between 1 and 2";
        if (reply == "" || isNaN(reply))
            throw "No input found , Choose between 1 and 2";
        if (reply == '1') {
            clinique.registerPatient();
        }
        else {
            clinique.purposeUser();
        }
    }
    catch (err) {
        console.log(err);
        userInput();
    }
}
userInput();
