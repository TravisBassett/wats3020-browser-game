/* WATS 3020 Browser Game project */
/* A tic tac toe game for two players. */

// variable 'game` refers to the current game
let game;

// class `Player` accepts an argument named`token` when called.
class Player {
    constructor(token) {
        this.token = token;
    }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor() {
        // creates `player1` and `player2` values, and assigns them icons.
        this.player1 = new Player('times');
        this.player2 = new Player('circle');


        // Initialize properties to track game
        this.currentPlayer = null;
        this.gameStatus = null;
        this.winner = null;
        this.moveCount = 0;

        // Set up DOM elements used in game as Class properties
        this.startPrompt = document.querySelector('#start-prompt');
        this.movePrompt = document.querySelector('#move-prompt');
        this.currentPlayerToken = document.querySelector('#player-token');
        this.gameboard = document.querySelector('#gameboard');
        this.winScreen = document.querySelector('#win-screen');
        this.winnerToken = document.querySelector('#winner-token');
        this.drawScreen = document.querySelector('#draw-screen');

        // Initialize an Array representing the starting state of the game board.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States, charts every possible win scnario of tic tac toe on the 3x3 grid for both players
        this.winStates = [
            [
                [0, 0],
                [0, 1],
                [0, 2]
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2]
            ],
            [
                [2, 0],
                [2, 1],
                [2, 2]
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0]
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1]
            ],
            [
                [0, 2],
                [1, 2],
                [2, 2]
            ],
            [
                [0, 0],
                [1, 1],
                [2, 2]
            ],
            [
                [0, 2],
                [1, 1],
                [2, 0]
            ]
        ];
    }

    // this function mecks for winner and alerts players if win conditions are met
    checkForWinner() {
        for (let condition of this.winStates) {
            let winningCondition = true;
            for (let position of condition) {
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                let winEvent = new Event('win');
                document.dispatchEvent(winEvent);
                return true;
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`) //for testing
        if (this.moveCount >= 9) { //handles game ending in a draw at 9 moves
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

            let drawEvent = new Event('draw');
            document.dispatchEvent(drawEvent);
        }
    }

    recordMove(event) {
        // This method handles recording a move in the `this.gameState` property by doing the following:
        // 1. Find the X, Y coordinates of the tile that was just selected
        // 2. Claim that tile in the `this.gameState` array
        // 3. Set the class attribute of the tile to reflect which player has claimed it

        let tile_x = event.target.dataset.x;
        let tile_y = event.target.dataset.y;

        if (!this.gameState[tile_x][tile_y]) {
            this.gameState[tile_x][tile_y] = this.currentPlayer.token;
            event.target.setAttribute('class', `tile played fas fa-${this.currentPlayer.token}`)
        } else {
            return false;
        }
    }
    switchPlayer() {
        // This method handles switching between players after each move by
        // seeing how the current player is and assigning the opposite player.
        if (this.currentPlayer === this.player1) {
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }

        // assign the current player's token after the player value has been switched
        this.currentPlayerToken.setAttribute('class', `fas fa-${this.currentPlayerToken}`);
    }
    setUpTileListeners() {
        // This method sets up event listeners for tiles. It is called when we
        // start a new game. It must find all the tiles and apply event listeners
        // to them.

        // locates all tiles in `tileElements
        let tileElements = document.querySelectorAll('.tile');

        // applies click listener to all tiles in `tileElements` and calls handle move when 
        // they are clicked
        for (const tile of tileElements) {
            tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen() {
        // This method displays the end game screen for a Win.

        this.winScreen.setAttribute('class', 'show');

        // shows the winning players token
        this.winnerToken.setAttribute('class', `fas fa-${this.currentPlayer.token}`)
    }
    showDrawScreen() {
        // This method displays the end game screen for a Draw.
        this.drawScreen.setAttribute('class', 'show');
    }
    setUpBoard() {
        this.gameboard.innerHTML = '';

        // Draws the game board by using a loop to create rows with
        // tiles in them.

        // Creates a `for` loop that will loop three times.
        for (let i = 0; i < 3; i++) {


            let newRow = document.createElement('div');
            newRow.setAttribute('class', 'row');
            for (let j = 0; j < 3; j++) {
                let newCol = document.createElement('div');
                newCol.setAttribute('class', 'col-xs-3');
                let newTile = document.createElement('span');

                newTile.setAttribute('class', 'fas fa-question tile');

                newTile.setAttribute('data-x', i);

                newTile.setAttribute('data-y', j);

                newCol.appendChild(newTile);
                newRow.appendChild(newCol);
            }
            this.gameboard.appendChild(newRow);
        }

        // sets up listeners to all tiles
        this.setUpTileListeners();

    }
    initializeMovePrompt() {
        this.startPrompt.setAttribute('class', 'hidden')
        this.movePrompt.setAttribute('class', '');
        this.currentPlayer = this.player1;
        this.currentPlayerToken.setAttribute('class', `fas fa-${this.currentPlayer.token}`);
    }
    start() {
        console.log('start game'); // for testing
        this.setUpBoard();
        console.log('set up board'); // for testing
        this.initializeMovePrompt();
        console.log('init move prompt');
    }
} // End of the Tic Tac Toe Class definition.

document.addEventListener('DOMContentLoaded', (event) => {

    let startBUtton = document.querySelector('#start-button');
    startBUtton.addEventListener('click', (event) => {
        game = new TicTacToe();
        game.start();
    });
});

// An event listener on the `document` object that listens for the
// "win" event signal.
document.addEventListener('win', (event) => {
    console.log('win event fired');
    game.showWinScreen();
})

//  Event listener on the `document` object that listens for the
// "draw" event signal.

document.addEventListener('draw', (event) => {
    console.log('draw event fired');
    // TODO: In the handler for the "draw" event, call the `game.showDrawScreen()`
    // method to display the tie game screen.
    game.showDrawScreen();
})

// External function for event listeners provided for you.
function handleMove(event) {

    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}