class CompanyShares {
    private name : string = "";
    private symbol : string = "";
    private price : number = 0;

    constructor() {}

    getCompanyName(){
        return this.name;
    }

    getCompanySymbol(){
        return this.symbol;
    }

    getCompanyPrice(){
        return this.price;
    }

    setCompanyName(name:string){
     this.name = name;
    }

    setCompanySymbol(symbol:string){
     this.symbol = symbol;
    }

    setCompanyPrice(price:number){
     this.price = price;
    }
}
export = CompanyShares;
