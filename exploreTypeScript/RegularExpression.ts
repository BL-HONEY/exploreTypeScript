/***************************************************************************** 
* 
*  Purpose         : Read in the following message: Hello <<name>>, We have your full
*                    name as <<full name>> in our system. your contact number is 91­xxxxxxxxxx.
*                    Please,let us know in case of any clarification Thank you BridgeLabz 01/01/2016.
*                    Use Regex to replace name, full name, Mobile#, and Date with proper value.
* 
*  @description    
* 
*  @file           : RegularExpression.ts
*  @overview       : Use Regex to replace name, full name, Mobile#, and Date with proper value.
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 28-01-2019
*
******************************************************************************/

/** requiring utility class */
var utility = require('../Utility/Utility');

/** create obejct of utility class */
var utility = new utility();

/**
 * @description class RegularExpression
 * 
 * @class RegularExpression
 * @purpose  Use Regex to replace name, full name, Mobile#, and Date with proper value.
 */
class RegularExpression {
     
   /**
    * @description function to handle user
    */
     userInput() {

      try {

         console.log("\nEnter you full name: ");

         /** store full name */
         var fullName: string = utility.getString();

         if (fullName == "") throw "\nYour full Name is required , Empty string found"

         console.log("\nEnter your Mobile Number: ");

         /** store mobile number */
         var mNumber: string = utility.getString();

         if (mNumber == "") throw "\nNo input or String found , Please Enter a valid mobile number. ";
         if (mNumber.length != 10) throw "Phone number should only be of 10 digits";

         utility.replaceString(fullName, mNumber);

         /** handle exceptions */
      } catch (err) {

         console.log(err);
         console.log("\nTry again !!!!");
         this.userInput();

      }


   }

}

var express = new RegularExpression();
express.userInput();