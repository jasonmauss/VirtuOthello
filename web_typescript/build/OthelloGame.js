import { OthelloGameBoard } from "./OthelloGameBoard.js";
import { OthelloGameMovePlayed, moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js";
import { OthelloUtils } from "./OthellUtils.js";
import { MoveUtils } from "./MoveUtils.js";
// This class represents the othello game being played.
// It contains properties and methods relevant to managing
// the game and being able to determine certain attributes
// needed to maintain the game board, etc.
export class OthelloGame {
    constructor(gameType, players) {
        /**
         * @remarks
         * clears the moves played in the game
         * and also clears the move log list in the UI
         */
        this.clearMovesPlayed = () => {
            this.movesPlayed = [];
            const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            while (movesListSelectElement.options.length > 0)
                movesListSelectElement.options.remove(0);
            document.getElementById(constants.CSS_ELEMENT_ID_MOVES_PLAYED).innerText = 'moves played';
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
            this.gameIsInProgress = false;
            this.gameBoard.initializeNewGame();
            this.updateGameScore();
        };
        /**
         * @remarks
         * calls all of the methods that comprise a move in the game
         * @param boardPosition the position (id of the div element) that was clicked on the board e.g. "e6"
         * @param colorOfPieceToPlay which color should be played, black or white
         */
        this.performMove = (boardPosition, colorOfPieceToPlay) => {
            // a quick hack of logic to determine that the board position clicked on
            // is actually a valid place to play. This could be improved upon and made more bulletproof.
            // Commented out for now.
            // if(!document.getElementById(boardPosition)?.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE)) return;
            // since a move (potentially the first one) is being made, make sure the state of the
            // game being in progress is updated
            this.gameIsInProgress = true;
            // hide any currently playable indicators
            this.gameBoard.hidePlayableIndicators();
            this.gameBoard.removeCurrentLatestMoveIndicator();
            // Set the move type based on the color to play passed to this method
            const moveTypePlayed = colorOfPieceToPlay === constants.CSS_CLASS_NAME_BLACK
                ? moveType.BlackPiece
                : moveType.WhitePiece;
            const movePlayed = new OthelloGameMovePlayed(moveTypePlayed, boardPosition);
            // display the piece by adding the CSS class to it
            this.gameBoard.performMoveElementOperations(movePlayed);
            // call this so that the appropriate pieces get flipped
            const piecesFlipped = this.flipApplicablePiecesAfterMove(boardPosition, colorOfPieceToPlay);
            // Add the move to the log list
            this.gameBoard.AddMoveToLog(movePlayed, piecesFlipped);
            // call this afterwards so that the playable indicators are shown again, but for the other color
            // since it's the other colors turn now after the move has been played
            const oppositeColor = OthelloUtils.getOppositeColor(colorOfPieceToPlay);
            // Display the playable indicators again now for the opponent/other player
            this.gameBoard.displayPlayableIndicators(oppositeColor);
            // Swap the color for who's move it is now
            this.colorForCurrentMove = OthelloUtils.getOppositeColor(this.colorForCurrentMove);
            // Update the game score on the UI - number of white and black pieces on the board
            this.updateGameScore();
        };
        /**
         * @remarks
         * This method changes tiles from black to white or vice-versa depending on
         * the move that was just played. It will look in 8 different directions
         * on the board - up/down/left/right and their 4 diagonol equivalents.
         * @param movePlayedBoardPosition The board position where the move was played e.g. "e6"
         */
        this.flipApplicablePiecesAfterMove = (movePlayedBoardPosition, colorOfPiecePlayed) => {
            OthelloUtils.consoleLog('flipping applicable pieces after move.');
            const positionsToFlip = MoveUtils.getPositionsToFlip(colorOfPiecePlayed, movePlayedBoardPosition);
            const colorToRemove = OthelloUtils.getOppositeColor(colorOfPiecePlayed);
            for (let position of positionsToFlip) {
                document.getElementById(position)?.classList.remove(colorToRemove);
                document.getElementById(position)?.classList.add(colorOfPiecePlayed);
            }
            return positionsToFlip;
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
        /**
         * @remarks
         * Returns the color (black or white) for which player's
         * turn it currently is.
         */
        this.getColorOfCurrentMove = () => {
            return this.colorForCurrentMove;
        };
        /**
         * @remarks
         * Updates the game score on the UI - the number of white and black pieces on the board
         */
        this.updateGameScore = () => {
            const blackPieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_BLACK).length;
            const whitePieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_WHITE).length;
            document.getElementById(constants.CSS_CLASS_BLACK_PIECE_COUNT).innerText = 'Black : ' + blackPieceCount.toString();
            document.getElementById(constants.CSS_CLASS_WHITE_PIECE_COUNT).innerText = 'White : ' + whitePieceCount.toString();
        };
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard();
        this.movesPlayed = [];
        this.colorForCurrentMove = constants.CSS_CLASS_NAME_BLACK; // black always plays first no matter what
        this.gameIsInProgress = false; // initialize this to false so that whenever a new game begins it has the proper state/value
        this.moveIsInProgress = false; // initialize this to false since no new game would have a move in progress
        this.players = players; // two players should be passed in here, no more and no less. The rest of the code will ignore more than a second player
    }
}
//# sourceMappingURL=OthelloGame.js.map