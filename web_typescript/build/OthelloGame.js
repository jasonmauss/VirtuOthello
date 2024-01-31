import { OthelloGameBoard } from "./OthelloGameBoard.js";
import * as constants from "./constants.js";
// This class represents the othello game being played.
// It contains properties and methods relevant to managing
// the game and being able to determine certain attributes
// needed to maintain the game board, etc.
export class OthelloGame {
    constructor(gameType) {
        /**
         * clears the moves played in the game
         * and also clears the move log list in the UI
         */
        this.clearMovesPlayed = () => {
            this.movesPlayed = [];
            const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            while (movesListSelectElement.options.length > 0)
                movesListSelectElement.options.remove(0);
        };
        /**
         *  @remarks
         *  performs all operations necessary to reset the game
         *  back to being a new game. Clears the board, clears moves
         *  played, etc.
         */
        this.performAllNewGameActions = () => {
            this.gameBoard.clear();
            this.clearMovesPlayed();
            this.gameBoard.initializeNewGame();
        };
        /**
         *  @remarks
         *  Since black always plays first, When someone plays
         *  a "You as white" (YAW) game, black (the computer) needs to play an
         *  initial move.
         */
        this.performInitialBlackPieceMove = () => {
            document.getElementById('c4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
            document.getElementById('d4')?.classList.remove(constants.CSS_CLASS_NAME_WHITE);
            document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
            // this should get called after any move gets played
            this.gameBoard.displayPlayableIndicators();
        };
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard();
        this.movesPlayed = [];
    }
}
//# sourceMappingURL=OthelloGame.js.map