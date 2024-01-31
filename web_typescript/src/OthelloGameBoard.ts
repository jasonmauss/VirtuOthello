import { OthelloGameMovePlayed, moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js"
import { gameType } from "./gameTypeEnum.js";
// This file represents the game board class which contains
// and manages an Othello game board. The OthelloGame class
// has a property which is an instance of this class
export class OthelloGameBoard {

    constructor() {

    }

    /** 
     * @remarks
     * Adds the 4 standard starting pieces on the board no
     * matter what type of game is being played, HVH, YAW, YAB or SPL
     * 
     */
    public initializeNewGame() {
        const blackElementOne = document.getElementById('e4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
        const blackElementTwo = document.getElementById('d5')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
        const whiteElementOne = document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
        const whiteElementTwo = document.getElementById('e5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
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
    public performMove(movePlayed:OthelloGameMovePlayed) {

        const boardPositionElement: HTMLDivElement = document.getElementById(movePlayed.position) as HTMLDivElement;
        boardPositionElement?.classList.add(
            movePlayed.moveType === moveType.BlackPiece
            ? constants.CSS_CLASS_NAME_BLACK
            : constants.CSS_CLASS_NAME_WHITE
        );
        
        this.AddMoveToLog(movePlayed);
    }

    /**
     * Clears all pieces from the board
     * 
     */
    public clear() {
        const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
        // only get children that have a class name applied to them since those are
        // the only ones we need to clear
        const boardElements: NodeListOf<Element> = 
            board?.querySelectorAll('.' + constants.CSS_CLASS_NAME_BLACK + ',' +
                                    '.' + constants.CSS_CLASS_NAME_WHITE + ',' +
                                    '.' + constants.CSS_CLASS_NAME_PLAYABLE + ',' +
                                    '.' + constants.CSS_CLASS_NAME_MOST_RECENT_MOVE
                                    ) as NodeListOf<Element>;

        for(let divElement of boardElements) {
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

    /**
     * @remarks
     * 
     */
    public hidePlayableIndicators = ():void => {
        const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
        // only get children that have a class name applied to them since those are
        // the only ones we need to clear
        const boardElements: NodeListOf<Element> = 
            board?.querySelectorAll('.' + constants.CSS_CLASS_NAME_PLAYABLE) as NodeListOf<Element>;

        for(let divElement of boardElements) {
            divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE);
        }
    }

    /**
     *  @remarks
     *  Adds classes to certain div elements to display the "playable" position
     *  indicators to the player who's turn it currently is.
     *  @param forWhichColorPlayer - which color player move indicators should
     *  be displayed for.
     */
    public displayPlayableIndicators = (forWhichColorPlayer:string): void => {
        console.log('showing indicators for ' + forWhichColorPlayer);
    };
}