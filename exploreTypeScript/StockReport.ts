var fs = require('fs');
var initial = 1;
var utility = require('../Utility/Utility');


var Utility = new utility();

class Stock {

    private stockName : string = "";
    private noOfShares: number = 0;
    private priceOfEach: number = 0;

    getStockName() : string{
        return this.stockName;
    }

    setStockName(stockName : string) {
        this.stockName = stockName;
    }

    getNoOfShares() : number{
        return this.noOfShares;
    }
       
    setNoOfShares(noOfShares : number){
        this.noOfShares = noOfShares;
    }

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

class StockPortfolio {

    calCostOfeachStack(noOfShares : number, priceOfEach : number) {
        return noOfShares * priceOfEach;
    }
    calCostOfAllStack(array : any) {
        return array.reduce(function (a:any, b:any) {
            return a + b;
        }, 0);
    }

     userInput(noOfStocks : number) {

        var stockInfo  = [];
         var costOfEach = [];
     
         var stock = new StockPortfolio;
     
         while (initial <= noOfStocks) {
     
             console.log("Please , Enter name of the stock: ");
             var stockName = Utility.getString();
             stockName = stockName.trim();
     
             console.log("Please , Enter total number of shares have you bought?: ");
             var noOfShares = Utility.getInteger();
     
             console.log("Please , Enter price of each share: ");
             var priceOfEach = Utility.getInteger();
     
             
     
             var stocks = new Stock();
             stocks.setStockName(stockName);
             stocks.setNoOfShares(noOfShares);
             stocks.setPriceOfEach(priceOfEach);
     
     
             stockInfo.push(stocks);
            
             initial++;
         }
          Utility.writeDataToJson3(stockInfo);
          
         console.log("\n--------***** STOCK REPORT *****--------");
     
          for (var i = 0; i < stockInfo.length; i++)
          {   
               costOfEach[i] = stock.calCostOfeachStack(stockInfo[i].getPriceOfEach(), stockInfo[i].getNoOfShares());
              console.log(stockInfo[i].getStockName() + "'s Price is: " + costOfEach[i]);
         }
          var total = stock.calCostOfAllStack(costOfEach);
          console.log("Total investment done : " + total);
     
     }
        userInterface(){
           console.log("Enter number of stocks have you bought: ");
           var totalStocks = Utility.getInteger();
           this.userInput(totalStocks);
       }
}


var s = new StockPortfolio();


  s.userInterface();