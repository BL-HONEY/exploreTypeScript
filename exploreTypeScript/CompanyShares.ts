/***************************************************************************** 
* 
*  Purpose         : Create CompanyShares object which has
*                     stock Symbol and Number of Shares as well as DateTime of the transaction.  
* 
*  @description    
* 
*  @file           : CompanyShares.ts
*  @overview       : Create CompanyShares object which has
8                    stock Symbol and Number of Shares as well as DateTime of the transaction.  
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 29-01-2019
*
******************************************************************************/

/**
 * @description class CompanyShares
 * 
 * @class CompanyShares
 * @purpose  create getter , setter functions to set and get values related to vcompany shares
 */
class CompanyShares {

   /**
    * instance member name of string type 
    * @access private
    */
    private name : string = "";
 
   /**
    * instance member symbol of string type 
    * @access private
    */
    private symbol : string = "";

   /**
     * instance member price of number type 
     * @access private
     */ 
    private price : number = 0;

    constructor() {}
   
   /**
    * @description getter function to return name
    * @returns {string} name
    */
    getCompanyName(){
        return this.name;
    }
    
    /**
    * @description getter function to return symbol
    * @returns {string} symbol
    */
    getCompanySymbol(){
        return this.symbol;
    }
    
   /**
    * @description getter function to return price
    * @returns {number} price
    */ 
    getCompanyPrice(){
        return this.price;
    }
    
    /**
     * @description setter function to set name
     * @param {string} name 
     */
    setCompanyName(name:string){
     this.name = name;
    }
    
    /**
     * @description setter function to set symbol
     * @param {string} symbol 
     */
    setCompanySymbol(symbol:string){
     this.symbol = symbol;
    }
   
    /**
     * @description setter function to set price
     * @param {number} price 
     */
    setCompanyPrice(price:number){
     this.price = price;
    }
}
export = CompanyShares;
