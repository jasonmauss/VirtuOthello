import { MoveUtils } from "./MoveUtils.js";
import { OthelloUtils } from "./OthellUtils.js";
import { moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js";
// This file represents the game board class which contains
// and manages an Othello game board. The OthelloGame class
// has a property which is an instance of this class
export class OthelloGameBoard {
    constructor(othelloGame) {
        /**
         * @remarks
         * Adds a move to the moves log for the game
         *
         * @param movePlayed instance of an OthelloGameMovePlayed class that defines
         * the type of move played.
         *
         */
        this.AddMoveToLog = (movePlayed, piecesFlipped) => {
            OthelloUtils.consoleLog('Adding move to log');
            const playerColor = movePlayed.moveType === moveType.BlackPiece
                ? constants.CSS_CLASS_NAME_BLACK
                : constants.CSS_CLASS_NAME_WHITE;
            let optionText = `${playerColor} played at position ${movePlayed.position.toUpperCase()}`;
            if (piecesFlipped.length > 0)
                optionText += ` - ${piecesFlipped.length} piece(s) flipped`;
            const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            const moveNumber = movesListSelectElement.options.length + 1;
            const moveOptionElement = new Option();
            moveOptionElement.text = `Move ${moveNumber}: ${optionText}`;
            moveOptionElement.value = `${moveNumber}|${playerColor}|${movePlayed.position}|${piecesFlipped.length}|${piecesFlipped.toString()}`;
            movesListSelectElement.options.add(moveOptionElement);
            document.getElementById(constants.CSS_ELEMENT_ID_MOVES_PLAYED).innerText =
                `${moveNumber} ${moveNumber > 1 ? 'moves' : 'move'} played`;
        };
        /**
         * @remarks
         * This methods hides any playable indicators that might be present
         * on the board from previous moves played
         */
        this.hidePlayableIndicators = () => {
            OthelloUtils.consoleLog('hiding playable indicators');
            // only get children that have a class name applied to them since those are
            // the only ones we need to clear
            const boardElements = OthelloUtils.boardPositionsByClassNames('.' + constants.CSS_CLASS_NAME_PLAYABLE_BLACK + ',.' +
                constants.CSS_CLASS_NAME_PLAYABLE_WHITE);
            for (let divElement of boardElements) {
                divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE_BLACK);
                divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE_WHITE);
            }
        };
        /**
         *  @remarks
         *  Adds classes to certain div elements to display the "playable" position
         *  indicators to the player who's turn it currently is.
         *  @param forWhichColorPlayer which color player move indicators should
         *  be displayed for.
         */
        this.displayPlayableIndicators = (forWhichColorPlayer) => {
            OthelloUtils.consoleLog('showing move indicators for ' + forWhichColorPlayer);
            // Need to find all pieces matching the color provided by the 'forWhichColorPlayer'
            // argument that have only contiguous opposite color pieces along one of 8 axes, followed
            // by an empty board position.
            const playableBoardPositions = MoveUtils.getPositionsForPlayableIndicators(forWhichColorPlayer);
            for (const position of playableBoardPositions) {
                document.getElementById(position)?.classList.add(constants.CSS_CLASS_NAME_PLAYABLE + forWhichColorPlayer);
            }
        };
        /**
         * @remarks
         * Removes the current latest move indicator from the div element
         * that has the CSS class that causes it to appear in the UI
         */
        this.removeCurrentLatestMoveIndicator = () => {
            // get the element that has the latest move class on it. Note the nullable check on
            // the currentLatestMoveElement - handles the case where it's the first move of the game
            // and no elements have that class on them yet.
            const currentLatestMoveElement = document.getElementsByClassName(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE)[0];
            currentLatestMoveElement?.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        };
        /**
         * @remarks
         * Uses the move list metadata to set the red dot latest move indicator on the board position
         * that represents the latest move. Mainly called after a move rollback occurs
         */
        this.restoreCurrentLatestMoveIndicator = () => {
            const moveSelectList = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            const lastOptionIndex = moveSelectList.options.length - 1;
            const optionElement = moveSelectList.options.item(lastOptionIndex);
            const optionElementValueArray = optionElement.value.split('|');
            const boardPositionElement = document.getElementById(optionElementValueArray[2]);
            boardPositionElement?.classList.add(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        };
        /**
         * @remarks
         * Call this to know how many pieces are on the board.
         * @returns the total combined number of both black and white pieces on the board.
         */
        this.totalBoardPieces = () => {
            const blackPieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_BLACK).length;
            const whitePieceCount = document.getElementsByClassName(constants.CSS_CLASS_NAME_WHITE).length;
            return blackPieceCount + whitePieceCount;
        };
        /**
         * @remarks
         * This method is really only useful when you don't care or know which color there are indicators shown for, you
         * just want to know how many are displayed. This is used mainly to determine if a turn-skip scenario is in play.
         * @returns the total number of playable indicators shown on the board for both colors combined. But at any given
         * time there will likely only be indicators shown for one color or the other
         */
        this.playableIndicatorCount = () => {
            return OthelloUtils.boardPositionsByClassNames('.' + constants.CSS_CLASS_NAME_PLAYABLE_BLACK +
                ',.' + constants.CSS_CLASS_NAME_PLAYABLE_WHITE).length;
        };
        /**
         * @remarks
         * This method allows you to know how many playable indicators would be shown for a certain
         * color without the indicators being displayed. Helpful for determining a skip-turn scenario.
         * @param whichColor The color you want to know the playable indicator count for
         * @returns the number of playable board positions there are for a particular color
         */
        this.playableSpacesForColor = (whichColor) => {
            const playableBoardPositions = MoveUtils.getPositionsForPlayableIndicators(whichColor);
            return playableBoardPositions.length;
        };
        /**
         * @remarks breaks down the move metadata and collects the other move metadata from moves that came
         * after the selected move so rollback can complete
         * @param moveMetadata
         */
        this.rollbackToMove = (moveMetadata) => {
            const moveDataDetails = moveMetadata.split('|');
            const moveSelectList = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            // If they selected (double clicked) the last move in the list, we need to inform
            // the player that they can't rollback to the latest move - they are already there.
            if (Number(moveDataDetails[0]) === moveSelectList.options.length) {
                window.alert('The last move played cannot be rolled back to.');
                return;
            }
            // remove playable indicators and the most recent move indicator
            this.hidePlayableIndicators();
            this.removeCurrentLatestMoveIndicator();
            // collect move metadata from the list of <option> elements that come at the position
            // selected + 1, as well as all the moves that came after that. The reason for selected + 1 is that
            // we are rolling back to that move, but not rolling back that move itself. Since the "optionIndexSelected" is 1-based
            // and the <option> elements in the select list are zero-based, we start the for loop at just optionIndexSelected, not
            // optionIndexSelected + 1
            const optionMetadataParsed = [];
            const optionIndexSelected = Number(moveDataDetails[0]);
            for (let optionIndex = optionIndexSelected; optionIndex < moveSelectList.options.length; ++optionIndex) {
                const optionElement = moveSelectList.options.item(optionIndex);
                const optionElementValueArray = optionElement.value.split('|');
                // in order to rollback moves we need to collect three things - which color the pieces got changed to,
                // which board position the move/piece was played on (because it needs to be removed), and which board positions
                // need to have their color set to the opposite of the color played to rollback that particular turn.
                optionMetadataParsed.push([
                    optionElementValueArray[1],
                    optionElementValueArray[2],
                    optionElementValueArray[4]
                ]);
            }
            // call this with an initial index targeting the last item in the list (length - 1) so that it
            // can keep subtracting 1 from the index as it rolls back moves
            this.performBoardMovesRollback(optionMetadataParsed, optionMetadataParsed.length - 1);
        };
        /**
         * @remarks This method is to be called after a series of move undo/rollback
         * steps have been made and various state needs to be restored to the UI elements
         * to reflect the new state of the board pieces
         */
        this.performPostMovesRollbackOperations = () => {
            const currentMoveColor = this.parentOthelloGame.getColorOfCurrentMoveFromMoveList();
            this.parentOthelloGame.setColorOfCurrentMove(currentMoveColor);
            this.displayPlayableIndicators(currentMoveColor);
            this.parentOthelloGame.updateGameScore();
            this.parentOthelloGame.UpdateColorPlayersTurnBorderIndicator();
            this.restoreCurrentLatestMoveIndicator();
        };
        /**
         * @remarks performs the actual rollback interaction with the board html elements
         * @param parsedOptionMetadata the move metadata parsed from the <option> element's values
         * @param rollbackIndex - which index we are starting at, this will get decremented as it's called
         * recursively each time.
         */
        this.performBoardMovesRollback = (parsedOptionMetadata, rollbackIndex) => {
            if (rollbackIndex < 0) {
                this.performPostMovesRollbackOperations();
                return;
            }
            const optionMetadata = parsedOptionMetadata[rollbackIndex];
            const colorToChangePiecesBackTo = OthelloUtils.getOppositeColor(optionMetadata[0]);
            const boardPositionToRemovePieceFrom = optionMetadata[1];
            const boardPositionsToFlipBackToPreviousColor = optionMetadata[2].split(',');
            // remove the piece that was played
            document.getElementById(boardPositionToRemovePieceFrom)?.classList.remove(optionMetadata[0]);
            boardPositionsToFlipBackToPreviousColor.forEach((elementId) => {
                document.getElementById(elementId)?.classList.remove(optionMetadata[0]);
                document.getElementById(elementId)?.classList.add(colorToChangePiecesBackTo);
            });
            // remove the move <option> element from the list (it will always be the last one in the list when we
            // are doing this type of rollback so we can just provide the length - 1 for the index.
            const moveSelectList = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
            moveSelectList.options.remove(moveSelectList.options.length - 1);
            // process the rest of the moves in the list with a half second (500ms) pause between moves rolled back
            window.setTimeout(() => {
                this.performBoardMovesRollback(parsedOptionMetadata, --rollbackIndex);
            }, 500);
        };
        /**
         *
         * @param moveData @remarks
         * breaks down the move metadata and hands it off to be highlighted
         */
        this.highlightMove = (moveMetadata) => {
            const moveDataDetails = moveMetadata.split('|');
            const boardPositionsToHighlight = [];
            boardPositionsToHighlight.push(moveDataDetails[2]);
            boardPositionsToHighlight.push(...moveDataDetails[4].split(','));
            const querySelectorString = boardPositionsToHighlight.map((value) => '#' + value).join(',');
            this.performBoardPositionHighlighting(document.querySelectorAll(querySelectorString), 8);
        };
        /**
         * @remarks Highlights board positions passed in by fading in and out an indicator dot on the pieces
         * @param boardPositions the board positions that should be highlighted
         */
        this.performBoardPositionHighlighting = (boardPositions, toggleCycles) => {
            // for every board position passed in - toggle the highlight move class on it
            boardPositions.forEach((x) => {
                // if one of the elements passed in has the most recent move class on it,
                // we need to remove that and hold a reference to that element so we can put it back on later
                if (x.classList.contains(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE)) {
                    this.latestMoveElement = x;
                    x.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
                }
                // if this is the last toggle cycle, make sure the highlight is removed
                if (toggleCycles === 0) {
                    x.classList.remove(constants.CSS_CLASS_NAME_HIGHLIGHT_MOVE);
                }
                else {
                    // otherwise, just toggle it
                    x.classList.toggle(constants.CSS_CLASS_NAME_HIGHLIGHT_MOVE);
                }
            });
            // This method is recursive and calls itself, decrementing the toggleCycles count each time.
            // If toggleCycles reaches zero, we restore the most recent move class back (if needed).
            if (toggleCycles === 0) {
                if (this.latestMoveElement) {
                    this.latestMoveElement?.classList.add(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
                    this.latestMoveElement = null; // set this back to it's default value of null
                }
                return;
            }
            else {
                // continue to call itself every half second (500 ms) with one less toggle cycle left
                window.setTimeout(() => {
                    this.performBoardPositionHighlighting(boardPositions, --toggleCycles);
                }, 500);
            }
        };
        this.occupiedPositions = new Set();
        this.latestMoveElement = null;
        this.parentOthelloGame = othelloGame;
    }
    /**
     * @remarks
     * Adds the 4 standard starting pieces on the board no
     * matter what type of game is being played, HVH, YAW, YAB or SPL
     *
     */
    initializeNewGame() {
        this.hidePlayableIndicators();
        OthelloUtils.consoleLog('initializing new game, placing initial 4 pieces.');
        const blackElementOne = document.getElementById('e4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
        const blackElementTwo = document.getElementById('d5')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
        const whiteElementOne = document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
        const whiteElementTwo = document.getElementById('e5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
        this.occupiedPositions.add('e4').add('d5').add('d4').add('e5');
    }
    /**
     * Adds a piece to the board
     * @remarks
     * Accepts an OthelloGameMovePlayed object and uses its
     * properties to determine where to add a piece to the board at.
     *
     * @param movePlayed instance of an OthelloGameMovePlayed class that defines the type of move
     * and on which square on the board
    */
    performMoveElementOperations(movePlayed) {
        OthelloUtils.consoleLog(`Placing ${movePlayed.moveType === moveType.BlackPiece ? "black" : "white"} piece on board at ${movePlayed.position}`);
        const boardPositionElement = document.getElementById(movePlayed.position);
        const classToAdd = movePlayed.moveType === moveType.BlackPiece
            ? constants.CSS_CLASS_NAME_BLACK
            : constants.CSS_CLASS_NAME_WHITE;
        boardPositionElement?.classList.add(classToAdd);
        // add this class to the element as well to indicate it was the most recent move
        boardPositionElement?.classList.add(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        // (maintain/append to) the collection of occupied positions so we know which elements
        // should be allowed to have pieces placed on them or not.
        this.occupiedPositions.add(movePlayed.position);
    }
    /**
     * @remarks
     * Clears all pieces from the board by removing classes from
     * the game board's div elements
     *
     */
    clear() {
        OthelloUtils.consoleLog('clearing board');
        // only get children that have a class name applied to them since those are
        // the only ones we need to clear
        const boardElements = OthelloUtils.boardPositionsByClassNames('.' + constants.CSS_CLASS_NAME_BLACK + ',' +
            '.' + constants.CSS_CLASS_NAME_WHITE + ',' +
            '.' + constants.CSS_CLASS_NAME_PLAYABLE + ',' +
            '.' + constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        for (let divElement of boardElements) {
            divElement.classList.remove(constants.CSS_CLASS_NAME_WHITE);
            divElement.classList.remove(constants.CSS_CLASS_NAME_BLACK);
            divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE_BLACK);
            divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE_WHITE);
            divElement.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        }
    }
}
//# sourceMappingURL=OthelloGameBoard.js.map