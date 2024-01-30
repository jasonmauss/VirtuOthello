import { moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js";
// This file represents the game board class which contains
// and manages an Othello game board. The OthelloGame class
// has a property which is an instance of this class
export class OthelloGameBoard {
    constructor() {
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
    performMove(movePlayed) {
        const boardPositionElement = document.getElementById(movePlayed.position);
        boardPositionElement?.classList.add(movePlayed.moveType === moveType.BlackPiece
            ? constants.CSS_CLASS_NAME_BLACK
            : constants.CSS_CLASS_NAME_WHITE);
        this.AddMoveToLog(movePlayed);
    }
    /**
     * Clears all pieces from the board
     *
     */
    clear() {
        const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
        // only get children that have a class name applied to them since those are
        // the only ones we need to clear
        const boardElements = board?.querySelectorAll('.' + constants.CSS_CLASS_NAME_BLACK + ',' +
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
    AddMoveToLog(movePlayed) {
        const playerColor = movePlayed.moveType === moveType.BlackPiece ? 'Black' : 'White';
        const optionText = `${playerColor} played at position ${movePlayed.position.toUpperCase()}`;
        const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
        const moveNumber = movesListSelectElement.options.length + 1;
        const moveOptionElement = new HTMLOptionElement();
        moveOptionElement.text = `Move ${moveNumber}: ${optionText}`;
        moveOptionElement.value = `${moveNumber}|${playerColor}|${movePlayed.position}`;
        movesListSelectElement.options.add(moveOptionElement);
    }
}
//# sourceMappingURL=OthelloGameBoard.js.map