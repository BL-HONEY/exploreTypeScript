var utility = require('../Utility/Utility');
/** creating object of utility class */
var Utility = new utility();
var DeckOfCards = /** @class */ (function () {
    function DeckOfCards() {
    }
    DeckOfCards.prototype.distribute = function () {
        console.log("***---------Deck of Cards--------***");
        console.log("\nthe Cards the received by the 4 Players: ");
        Utility.deckOfCards();
    };
    return DeckOfCards;
}());
var cardsGame = new DeckOfCards();
cardsGame.distribute();
