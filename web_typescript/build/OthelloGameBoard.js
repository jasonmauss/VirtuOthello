import { OthelloUtils } from "./OthellUtils.js";
import { moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js";
// This file represents the game board class which contains
// and manages an Othello game board. The OthelloGame class
// has a property which is an instance of this class
export class OthelloGameBoard {
    constructor() {
        /**
         * @remarks
         * This methods hides any playable indicators that might be present
         * on the board from previous moves played
         */
        this.hidePlayableIndicators = () => {
            OthelloUtils.consoleLog('hiding playable indicators');
            // only get children that have a class name applied to them since those are
            // the only ones we need to clear
            const boardElements = OthelloUtils.boardPositionsByClassNames(constants.CSS_CLASS_NAME_PLAYABLE);
            for (let divElement of boardElements) {
                divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE);
            }
        };
        /**
         *  @remarks
         *  Adds classes to certain div elements to display the "playable" position
         *  indicators to the player who's turn it currently is.
         *  @param forWhichColorPlayer - which color player move indicators should
         *  be displayed for.
         */
        this.displayPlayableIndicators = (forWhichColorPlayer) => {
            OthelloUtils.consoleLog('showing move indicators for ' + forWhichColorPlayer);
            // Need to find all pieces matching the color provided by the 'forWhichColorPlayer'
            // argument that have only contiguous opposite color pieces along one of 8 axes.
            // start by getting a collection of elements that match (have the css class) for the
            // color passed in.
            const boardPositionsWithColor = OthelloUtils.boardPositionsByClassNames(forWhichColorPlayer);
        };
        this.removeCurrentLatestMoveIndicator = () => {
            // get the element that has the latest move class on it. Note the nullable check on
            // the currentLatestMoveElement - handles the case where it's the first move of the game
            // and no elements have that class on them yet.
            const currentLatestMoveElement = document.getElementsByClassName(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE)[0];
            currentLatestMoveElement?.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        };
        this.occupiedPositions = new Set();
    }
    /**
     * @remarks
     * Adds the 4 standard starting pieces on the board no
     * matter what type of game is being played, HVH, YAW, YAB or SPL
     *
     */
    initializeNewGame() {
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
     * @param movePlayed - instance of an OthelloGameMovePlayed class that defines the type of move
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
     * Clears all pieces from the board
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
            divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE);
            divElement.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        }
    }
    /**
     * Adds a move to the moves log for the game
     *
     * @param movePlayed - instance of an OthelloGameMovePlayed class that defines
     * the type of move played.
     *
     */
    AddMoveToLog(movePlayed, piecesFlipped = 0) {
        OthelloUtils.consoleLog('Adding move to log');
        const playerColor = movePlayed.moveType === moveType.BlackPiece ? 'Black' : 'White';
        let optionText = `${playerColor} played at position ${movePlayed.position.toUpperCase()}`;
        if (piecesFlipped > 0)
            optionText += ` - ${piecesFlipped} piece(s) flipped`;
        const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
        const moveNumber = movesListSelectElement.options.length + 1;
        const moveOptionElement = new Option();
        moveOptionElement.text = `Move ${moveNumber}: ${optionText}`;
        moveOptionElement.value = `${moveNumber}|${playerColor}|${movePlayed.position}`;
        movesListSelectElement.options.add(moveOptionElement);
        document.getElementById(constants.CSS_ELEMENT_ID_MOVES_PLAYED).innerText =
            `${moveNumber} ${moveNumber > 1 ? 'moves' : 'move'} played`;
    }
}
//# sourceMappingURL=OthelloGameBoard.js.map