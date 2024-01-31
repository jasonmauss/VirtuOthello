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
         * @remarks
         *
         * @param boardPosition
         * @param colorOfPieceToPlay
         */
        this.performMove = (boardPosition, colorOfPieceToPlay) => {
            // a quick hack of logic to determine that the board position clicked on
            // is actually a valid place to play. This could be improved upon and made more bulletproof.
            // if(!document.getElementById(boardPosition)?.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE)) return;
            // hide any currently playable indicators
            this.gameBoard.hidePlayableIndicators();
            // display the piece by adding the CSS class to it
            document.getElementById(boardPosition)?.classList.add(colorOfPieceToPlay);
            // call this so that the appropriate pieces get flipped
            this.flipApplicablePiecesAfterMove(boardPosition, colorOfPieceToPlay);
        };
        /**
         * @remarks
         *
         * @param movePlayedBoardPosition
         */
        this.flipApplicablePiecesAfterMove = (movePlayedBoardPosition, colorOfPiecePlayed) => {
            const whichColorToShowIndicatorsFor = colorOfPiecePlayed === constants.CSS_CLASS_NAME_BLACK
                ? constants.CSS_CLASS_NAME_WHITE
                : constants.CSS_CLASS_NAME_BLACK;
            // call this afterwards so that the playable indicators are shown again
            this.gameBoard.displayPlayableIndicators(whichColorToShowIndicatorsFor);
        };
        /**
         *  @remarks
         *  Since black always plays first, When someone plays
         *  a "You as white" (YAW) game, black (the computer) needs to play an
         *  initial move.
         */
        this.performInitialBlackPieceMove = () => {
            this.performMove('c4', constants.CSS_CLASS_NAME_BLACK);
        };
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard();
        this.movesPlayed = [];
    }
}
//# sourceMappingURL=OthelloGame.js.map