import { moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js";
// This file represents the game board class which contains
// and manages an Othello game board. The OthelloGame class
// has a property which is an instance of this class
export class OthelloGameBoard {
    constructor() {
    }
    /**
        performMove
        movePlayed: instance of an OthelloGameMovePlayed class that defines the type of move
        and on which square on the board
    */
    performMove(movePlayed) {
        const boardPositionElement = document.getElementById(movePlayed.position);
        boardPositionElement?.classList.add(movePlayed.moveType === moveType.BlackPiece
            ? constants.CSS_CLASS_NAME_BLACK
            : constants.CSS_CLASS_NAME_WHITE);
        this.AddMoveToLog(movePlayed);
    }
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