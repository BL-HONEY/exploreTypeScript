/**************************************************************************************** 
* 
*  Purpose         : Shuffle the cards using Random method and then
*                     distribute 9 Cards to 4 Players and Print the Cards the received by the 4 Players
* 
*  @description    
* 
*  @file           : Cards.ts
*  @overview       :Shuffle the cards using Random method and then
*                   distribute 9 Cards to 4 Players and Print the Cards the received by the 4 Players 
*
*  @author         : Honey 
*  @version        : 1.0
*  @since          : 31-01-2019
*
******************************************************************************/


var utility = require('../Utility/Utility');

/** creating object of utility class */
var Utility = new utility();

/**
 * @description class Cards.ts
 * 
 * @class Cards
 * @purpose  Distribute cards among 4 players
 */
class DeckOfCards{

   distribute(){

    console.log("***---------Deck of Cards--------***");
    console.log("\nthe Cards the received by the 4 Players: ");
    Utility.deckOfCards();
    

   }
}

/**
 * create an object of DeckOfCards type
 */
var cardsGame = new DeckOfCards();
cardsGame.distribute();
