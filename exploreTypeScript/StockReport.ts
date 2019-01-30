/***************************************************************************** 
* 
*  Purpose         : To read in Stock Names, Number of Share, Share Price.
*                     Print a Stock Report with total value of each Stock and the total value of Stock.
* 
*  @description    
* 
*  @file           : StockReport.ts
*  @overview       : To read in Stock Names, Number of Share, Share Price.
*                    Print a Stock Report with total value of each Stock and the total value of Stock.
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 28-01-2019
*
******************************************************************************/

/** including file system module */
var fs = require('fs');

var initial = 1;

/** requiring utility class */
var utility = require('../Utility/Utility');

/** creating object of utility class */
var Utility = new utility();

/**
 * @description class Stock
 * 
 * @class Stock
 * @purpose  To read in Stock Names, Number of Share, Share Price.
 *  Print a Stock Report with total value of each Stock and the total value of Stock.
 */
class Stock {
    
     /**
     * instance member stockName of string type 
     * @access private
     */
    private stockName : string = "";

    /**
     * instance member noOfShares of string type 
     * @access private
     */
    private noOfShares: number = 0;

    /**
     * instance member priceOfEach of number type 
     * @access private
     */
    private priceOfEach: number = 0;
    
    /**
     * @description getter function to return stock name
     * @returns {string} stock name
     */
    getStockName() : string{
        return this.stockName;
    }

    setStockName(stockName : string) {
        this.stockName = stockName;
    }
    
    /**
     * @description getter function to return no of shares
     * @returns {number} no of shares
     */
    getNoOfShares() : number{
        return this.noOfShares;
    }
    
    
    setNoOfShares(noOfShares : number){
        this.noOfShares = noOfShares;
    }
    
     /**
     * @description getter function to return price of each stock
     * @returns {number} price of each share
     */
    getPriceOfEach() : number{
        return this.priceOfEach;
    }

    setPriceOfEach(priceOfEach : number){
        this.priceOfEach = priceOfEach;
    }
    // constructor(stockName, noOfShares, priceOfEach) {
    //     this.stockName = stockName;
    //     this.noOfShares = noOfShares;
    //     this.priceOfEach = priceOfEach;
    // }
}

/**
 * @description class StockPortfolio
 * 
 * @class StockPortfolio
 * @purpose  To read in Stock Names, Number of Share, Share Price.
 *  Print a Stock Report with total value of each Stock and the total value of Stock.
 */
class StockPortfolio {
    
    /**
     * @description function to calculate cost of each stack
     * @param {number} noOfShares 
     * @param {number} priceOfEach 
     * @returns {number} value of each stock
     */
    calCostOfeachStack(noOfShares : number, priceOfEach : number) {
        return noOfShares * priceOfEach;
    }

    /**
     * @description function to calculate sum of all stocks
     * @param array 
     * @returns sum of all stocks
     */
    calCostOfAllStack(array : any) {
        return array.reduce(function (a:any, b:any) {
            return a + b;
        }, 0);
    }
    
    /**
     * @description function to handle user
     * @param noOfStocks 
     */
     userInput(noOfStocks : number) {
       
        /**
         * empty  arrays to store values related to stock
         */
        var stockInfo  = [];
         var costOfEach = [];
        
         /** create one stockPortfolio object */
         var stock = new StockPortfolio;

         try{
     
         while (initial <= noOfStocks) {
     
             console.log("Please , Enter name of the stock: ");

             /** store stock name */
             var stockName = Utility.getString();
             stockName = stockName.trim();

             if(stockName = "") throw "Stock name required , empty string found"
     
             console.log("Please , Enter total number of shares have you bought?: ");

             /** store no of shares */
             var noOfShares = Utility.getInteger();
             
             if(noOfShares.toString() == "") throw "number of shares required , no data found"

             console.log("Please , Enter price of each share: ");

             /** store price of each stack */
             var priceOfEach = Utility.getInteger();
             
             if(priceOfEach.toString() == "") throw "price of each shares id required , no data found"
        
             var stocks = new Stock();
             stocks.setStockName(stockName);
             stocks.setNoOfShares(noOfShares);
             stocks.setPriceOfEach(priceOfEach);
     
             stockInfo.push(stocks);
            
             initial++;
         }

         /** write to stock report */
          Utility.writeDataToJson3(stockInfo);
          
         console.log("\n--------***** STOCK REPORT *****--------");
     
          for (var i = 0; i < stockInfo.length; i++)
          {   
              /** call function to calculate value of each stack */
               costOfEach[i] = stock.calCostOfeachStack(stockInfo[i].getPriceOfEach(), stockInfo[i].getNoOfShares());
              console.log(stockInfo[i].getStockName() + "'s Price is: " + costOfEach[i]);
         }

         /** call function to calculate value of all stacks*/
          var total = stock.calCostOfAllStack(costOfEach);
          console.log("Total investment done : " + total);
        /** exception handling */
        }catch(err){
         
            console.log(err);
            this.userInput(noOfStocks);
        }
     
     }  

     /**
      * @description function to handle user 
      */
        userInterface(){
           console.log("Enter number of stocks have you bought: ");
           var totalStocks = Utility.getInteger();
           this.userInput(totalStocks);
       }
}

/** stockPortfolio oboject */
var s = new StockPortfolio();

/** call userInterface() to execute program */
  s.userInterface();