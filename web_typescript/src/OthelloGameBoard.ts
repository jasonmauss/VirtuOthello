import { OthelloGameMovePlayed, moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js"
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
    public performMove(movePlayed:OthelloGameMovePlayed) {

        const boardPositionElement: HTMLDivElement = document.getElementById(movePlayed.position) as HTMLDivElement;
        boardPositionElement?.classList.add(
            movePlayed.moveType === moveType.BlackPiece
            ? constants.CSS_CLASS_NAME_BLACK
            : constants.CSS_CLASS_NAME_WHITE
        );
        
        this.AddMoveToLog(movePlayed);
    }

    public AddMoveToLog(movePlayed: OthelloGameMovePlayed) {
        const playerColor:string = movePlayed.moveType === moveType.BlackPiece ? 'Black' : 'White';
        const optionText:string = `${playerColor} played at position ${movePlayed.position.toUpperCase()}`;
        const movesListSelectElement: HTMLSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT) as HTMLSelectElement;
        const moveNumber:number = movesListSelectElement.options.length + 1;
        const moveOptionElement: HTMLOptionElement = new HTMLOptionElement();
        moveOptionElement.text = `Move ${moveNumber}: ${optionText}`;
        moveOptionElement.value = `${moveNumber}|${playerColor}|${movePlayed.position}`;
        movesListSelectElement.options.add(moveOptionElement);
    }
}