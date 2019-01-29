"use strict";
var dis = require('util');
var q = require('../../Utility/Queue');
var Player = /** @class */ (function () {
    function Player() {
    }
    /**
     * sort function to sort cards
     * @param {Array} distributed
     */
    Player.prototype.sort = function (distributed) {
        var store = new q.Queue();
        var split1, split2;
        /**
          * sorting and storing to distributed array
          */
        distributed.sort(
        /**
         * function to perform sort
         * @param {Number} a
         * @param {NUmber} b
         */
        function (a, b) {
            /**
             * split every column to store it to split11 and split2
             */
            split1 = a.split(" ");
            split2 = b.split(" ");
            if (Number(split1[0]) < Number(split2[0])) {
                /**
                 * return -1 for false
                 */
                return -1;
            }
            else {
                /**
                  * return 1 for true
                  */
                return 1;
            }
        });
        for (var i = 0; i < distributed.length; i++) {
            /**
             * Validating & Replacing card present at 'i' & 'j' index of 'card'.
             * 11 with 'Jack', 12 with 'Queen', 13 with 'King' & 14 with 'Ace'.
             */
            if (distributed[i].split(' ')[0] == 11) {
                distributed[i] = distributed[i].replace(/11/g, '☻ Jack');
            }
            else if (distributed[i].split(' ')[0] == 12) {
                distributed[i] = distributed[i].replace(/12/g, '◕‿◕  Queen');
            }
            else if (distributed[i].split(' ')[0] == 13) {
                distributed[i] = distributed[i].replace(/13/g, '☹  King');
            }
            else if (distributed[i].split(' ')[0] == 14) {
                distributed[i] = distributed[i].replace(/14/g, '▲ Ace');
            }
            store.enqueue(distributed[i]);
        }
        return store;
    };
    /**
     * Function to Shuffle & Distribute cards to the players.
     */
    Player.prototype.shuffle = function () {
        /**
         * 4 elements array to store cards for 4 persons
         */
        var distributed = new Array(4);
        for (var i = 0; i < distributed.length; i++) {
            distributed[i] = new Array(9);
        }
        /**
         * player object to store cards in queue
         */
        var player = new q.Queue();
        /**
        * declaring symbols for suits
        */
        var symbol = ["♣", "♦", "♥", "♠"];
        /**
         * Declaring rank in sorted format for all number cards
         */
        var rank = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
        /**
         *  array included to store cards
         */
        var included = [], index = 0;
        /**
         * variables row and column to store the random number generated for rows and column..
         */
        var row = 0, column = 0;
        for (var i = 0; i < distributed.length; i++) {
            for (var j = 0; j < distributed[i].length; j++) {
                /**
                  * variables row and column to store the random number generated for rows and column..
                  */
                row = Math.floor(Math.random() * symbol.length);
                column = Math.floor(Math.random() * rank.length);
                /**
                 * Conditional to check whether row and colomn are already included
                 */
                if (!included.includes(" " + row + " " + column + " ")) {
                    /**
                     * If true, then add them to distributed array
                     */
                    distributed[i][j] = rank[column] + " " + symbol[row];
                    /**
                     * store row and column value to included array
                     */
                    included[index++] = " " + row + " " + column + " ";
                }
                else {
                    /**
                     * If included array doesnt include that values for row and coloumn, decrement j
                     */
                    j--;
                }
            }
            /**
             * performing enqueue() to store cards in queue
             */
            player.enqueue(this.sort(distributed[i]));
        }
        return player;
    };
    return Player;
}());
/**
 * Function to start the program.
 */
function play() {
    // Creating a new Player object.
    var p = new Player();
    // Calling shuffle() function and storing the output in qq.
    var qq = p.shuffle();
    var size = qq.size() + 1;
    var x = [];
    // For loop to print the elements of the 'qq' Queue.
    for (var i = 1; i < size + 1; i++) {
        console.log("Player ", i, ":", qq.dequeue().get());
    }
}
// Calling main() function to start the program.
play();
