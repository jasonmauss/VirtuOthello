import { OthelloGameBoard } from "./OthelloGameBoard.js";
import { OthelloGameMovePlayed, moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js";
import { OthelloUtils } from "./OthellUtils.js";
import { MoveUtils } from "./MoveUtils.js";
import { playerColor } from "./OthelloPlayer.js";
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
            this.setGameMessage('');
            this.clearMovesPlayed();
            this.gameIsInProgress = false;
            this.gameBoard.initializeNewGame();
            this.updateGameScore();
            this.UpdateColorPlayersTurnBorderIndicator();
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
            // Update the game score on the UI - number of white and black pieces on the board
            this.updateGameScore();
            // After each move has been played, check to see how many pieces are on the board.
            // If there are 64 pieces, then the game is over. If there are not 64 pieces, then
            // check the count of playable indicators shown. Since it's possible for there to be
            // less than 64 pieces, but also no playable indicators (e.g. it's Black's move, but
            // they can't legally play a piece anywhere), we need to see if we are in a situation
            // where a turn skip scenario is at play.
            if (this.gameBoard.totalBoardPieces() === 64) {
                this.setGameMessage(this.generateGameOverMessage());
            }
            else {
                if (this.gameBoard.playableIndicatorCount() === 0) {
                    if (this.gameBoard.playableSpacesForColor(colorOfPieceToPlay) > 0) {
                        // we are in a turn skip scenario if we reach this point
                        // Give the player(s) time to read the skipping message (2 seconds)
                        // then turn control of making a move back over to the other color player
                        this.fadeInFadeOutGameMessage('Skipping ' + oppositeColor + '!', 9);
                        this.gameBoard.displayPlayableIndicators(colorOfPieceToPlay);
                    }
                    else {
                        // Even though there aren't 64 pieces on the board, neither color can make a move
                        // so the game has ended (this usually only happens late in games of Othello)
                        this.setGameMessage(this.generateGameOverMessage());
                    }
                }
                else {
                    // the game isn't over and playable indicators are shown
                    // so it's ok to indicate that it's the other color's turn now.
                    // Swap the color for who's move it is now
                    this.colorForCurrentMove = OthelloUtils.getOppositeColor(colorOfPieceToPlay);
                    this.UpdateColorPlayersTurnBorderIndicator();
                }
            }
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
         * @remarks Returns the color (black or white) for which player's
         * turn it currently is based on the move list instead of internal state
         */
        this.getColorOfCurrentMoveFromMoveList = () => {
            const moveSelectList = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            const lastOptionIndex = moveSelectList.options.length - 1;
            const optionElement = moveSelectList.options.item(lastOptionIndex);
            const optionElementValueArray = optionElement.value.split('|');
            // The color for the current player is going to be the opposite of the color that made the last
            // move that wasn't rolled back to. For example, if the last move in the list was made by black, then
            // the current color returned should be white, which is why we're using the getOppositeColor method here
            return OthelloUtils.getOppositeColor(optionElementValueArray[1].toLowerCase());
        };
        /**
         * @remarks
         * Sets the color of the player who's turn it is
         * @param color
         */
        this.setColorOfCurrentMove = (color) => {
            this.colorForCurrentMove = color;
        };
        /**
         * @remarks
         * Updates the game score on the UI - the number of white and black pieces on the board
         */
        this.updateGameScore = () => {
            const blackPieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_BLACK).length;
            const whitePieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_WHITE).length;
            let playerBlack = this.players.filter(x => x.playerColor === playerColor.black)[0];
            let playerWhite = this.players.filter(x => x.playerColor === playerColor.white)[0];
            document.getElementById(constants.CSS_CLASS_BLACK_PIECE_COUNT).innerText =
                `Black (${playerBlack.playerName}) : ${blackPieceCount.toString()}`;
            document.getElementById(constants.CSS_CLASS_WHITE_PIECE_COUNT).innerText =
                `White (${playerWhite.playerName}) : ${whitePieceCount.toString()}`;
        };
        /**
         * @remarks
         * Updates the border around white or black score to indicate which color player's turn it is to place a piece on the board
         */
        this.UpdateColorPlayersTurnBorderIndicator = () => {
            if (this.getColorOfCurrentMove() === constants.CSS_CLASS_NAME_BLACK) {
                document.getElementById(constants.CSS_CLASS_WHITE_PIECE_COUNT)?.classList.remove(constants.CSS_CLASS_NAME_IS_THEIR_TURN);
                document.getElementById(constants.CSS_CLASS_BLACK_PIECE_COUNT)?.classList.add(constants.CSS_CLASS_NAME_IS_THEIR_TURN);
            }
            else {
                document.getElementById(constants.CSS_CLASS_BLACK_PIECE_COUNT)?.classList.remove(constants.CSS_CLASS_NAME_IS_THEIR_TURN);
                document.getElementById(constants.CSS_CLASS_WHITE_PIECE_COUNT)?.classList.add(constants.CSS_CLASS_NAME_IS_THEIR_TURN);
            }
        };
        /**
         * @remarks
         * Updates the game message in the UI
         * @param message The message to be displayed in the UI
         */
        this.setGameMessage = (message) => {
            document.getElementById(constants.CSS_ELEMENT_ID_GAME_MESSAGE).innerText = message;
        };
        /**
         * @remarks Displays a game message in the UI but also fades it in and out to draw the players eye to the message
         * @param message the message to be displayed and faded in and out
         * @param fadeInOutCycles the number of times the message should fade in and out. For example, of value
         * of 4 would cause the message to fade in and out 2 times.
         */
        this.fadeInFadeOutGameMessage = (message, fadeInOutCycles) => {
            this.setGameMessage(message);
            const gameMessageElement = document.getElementById(constants.CSS_ELEMENT_ID_GAME_MESSAGE);
            if (gameMessageElement?.classList.contains('fade-out')) {
                gameMessageElement?.classList.remove('fade-out');
                gameMessageElement?.classList.add('fade-in');
            }
            else {
                gameMessageElement?.classList.remove('fade-in');
                gameMessageElement?.classList.add('fade-out');
            }
            if (fadeInOutCycles === 0) {
                gameMessageElement?.classList.remove('fade-in');
                gameMessageElement?.classList.remove('fade-out');
                this.setGameMessage('');
            }
            else {
                window.setTimeout(() => {
                    this.fadeInFadeOutGameMessage(message, --fadeInOutCycles);
                }, 500);
            }
        };
        /**
         * @remarks Takes an assessment of the pieces on the board combined with the types of players
         * playing the game and generates an appropriate message to display in the UI as a "game over" message
         * @returns A message of "Black Wins", "White Wins", or "You Win", "You Lose" depending on color and Human/AI players
         */
        this.generateGameOverMessage = () => {
            const blackPieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_BLACK).length;
            const whitePieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_WHITE).length;
            const playerBlack = this.players.filter(x => x.playerColor === playerColor.black)[0];
            const playerWhite = this.players.filter(x => x.playerColor === playerColor.white)[0];
            if (blackPieceCount === whitePieceCount)
                return constants.GAME_FINISH_MESSAGE_TIE;
            if (this.gameType === constants.GAME_TYPE_HUMAN_VS_HUMAN || this.gameType === constants.GAME_TYPE_SELF_PLAY) {
                return blackPieceCount > whitePieceCount
                    ? constants.GAME_FINISH_MESSAGE_BLACK_WINS
                    : constants.GAME_FINISH_MESSAGE_WHITE_WINS;
            }
            if (this.gameType === constants.GAME_TYPE_YOU_AS_BLACK) {
                return blackPieceCount > whitePieceCount
                    ? constants.GAME_FINISH_MESSAGE_YOU_WIN
                    : constants.GAME_FINISH_MESSAGE_YOU_LOSE;
            }
            if (this.gameType === constants.GAME_TYPE_YOU_AS_WHITE) {
                return whitePieceCount > blackPieceCount
                    ? constants.GAME_FINISH_MESSAGE_YOU_WIN
                    : constants.GAME_FINISH_MESSAGE_YOU_LOSE;
            }
            return '';
        };
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard(this);
        this.movesPlayed = [];
        this.colorForCurrentMove = constants.CSS_CLASS_NAME_BLACK; // black always plays first no matter what
        this.gameIsInProgress = false; // initialize this to false so that whenever a new game begins it has the proper state/value
        this.moveIsInProgress = false; // initialize this to false since no new game would have a move in progress
        this.players = players; // two players should be passed in here, no more and no less. The rest of the code will ignore more than a second player
    }
}
//# sourceMappingURL=OthelloGame.js.map