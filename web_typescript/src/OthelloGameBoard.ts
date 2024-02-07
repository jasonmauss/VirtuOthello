import { OthelloUtils } from "./OthellUtils.js";
import { OthelloGameMovePlayed, moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js"
import { gameType } from "./gameTypeEnum.js";
// This file represents the game board class which contains
// and manages an Othello game board. The OthelloGame class
// has a property which is an instance of this class
export class OthelloGameBoard {

    occupiedPositions:Set<string>;

    constructor() {
        this.occupiedPositions = new Set<string>();
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
    performMoveElementOperations(movePlayed:OthelloGameMovePlayed) {

        OthelloUtils.consoleLog(`Placing ${movePlayed.moveType === moveType.BlackPiece? "black" : "white"} piece on board at ${movePlayed.position}`);

        const boardPositionElement: HTMLDivElement = document.getElementById(movePlayed.position) as HTMLDivElement;
        
        const classToAdd:string =
            movePlayed.moveType === moveType.BlackPiece
            ? constants.CSS_CLASS_NAME_BLACK
            : constants.CSS_CLASS_NAME_WHITE
        
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
        const boardElements: NodeListOf<Element> = 
            OthelloUtils.boardPositionsByClassNames(
                '.' + constants.CSS_CLASS_NAME_BLACK + ',' +
                '.' + constants.CSS_CLASS_NAME_WHITE + ',' +
                '.' + constants.CSS_CLASS_NAME_PLAYABLE + ',' +
                '.' + constants.CSS_CLASS_NAME_MOST_RECENT_MOVE) as NodeListOf<Element>;

        for(let divElement of boardElements) {
            divElement.classList.remove(constants.CSS_CLASS_NAME_WHITE);
            divElement.classList.remove(constants.CSS_CLASS_NAME_BLACK);
            divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE);
            divElement.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
        }
    }

    /**
     * @remarks
     * Adds a move to the moves log for the game
     * 
     * @param movePlayed - instance of an OthelloGameMovePlayed class that defines
     * the type of move played.
     * 
     */
    AddMoveToLog(movePlayed: OthelloGameMovePlayed, piecesFlipped:number = 0) {
        OthelloUtils.consoleLog('Adding move to log');
        const playerColor:string = movePlayed.moveType === moveType.BlackPiece ? 'Black' : 'White';
        let optionText:string = `${playerColor} played at position ${movePlayed.position.toUpperCase()}`;
        if(piecesFlipped > 0) optionText += ` - ${piecesFlipped} piece(s) flipped`;
        const movesListSelectElement: HTMLSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT) as HTMLSelectElement;
        const moveNumber:number = movesListSelectElement.options.length + 1;
        const moveOptionElement: HTMLOptionElement = new Option();
        moveOptionElement.text = `Move ${moveNumber}: ${optionText}`;
        moveOptionElement.value = `${moveNumber}|${playerColor}|${movePlayed.position}`;
        movesListSelectElement.options.add(moveOptionElement);
        (document.getElementById(constants.CSS_ELEMENT_ID_MOVES_PLAYED) as HTMLSpanElement).innerText = 
            `${moveNumber} ${moveNumber > 1 ? 'moves' : 'move'} played`;
    }

    /**
     * @remarks
     * This methods hides any playable indicators that might be present
     * on the board from previous moves played
     */
    hidePlayableIndicators = ():void => {

        OthelloUtils.consoleLog('hiding playable indicators')

        // only get children that have a class name applied to them since those are
        // the only ones we need to clear
        const boardElements: NodeListOf<Element> = 
            OthelloUtils.boardPositionsByClassNames(constants.CSS_CLASS_NAME_PLAYABLE);

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
    displayPlayableIndicators = (forWhichColorPlayer:string): void => {
        OthelloUtils.consoleLog('showing move indicators for ' + forWhichColorPlayer);

        // Need to find all pieces matching the color provided by the 'forWhichColorPlayer'
        // argument that have only contiguous opposite color pieces along one of 8 axes.

        // start by getting a collection of elements that match (have the css class) for the
        // color passed in.
        const boardPositionsWithColor: NodeListOf<Element> = 
            OthelloUtils.boardPositionsByClassNames(forWhichColorPlayer);

            
    };

    /**
     * @remarks
     * Removes the current latest move indicator from the div element
     * that has the CSS class that causes it to appear in the UI
     */
    removeCurrentLatestMoveIndicator = (): void => {
        // get the element that has the latest move class on it. Note the nullable check on
        // the currentLatestMoveElement - handles the case where it's the first move of the game
        // and no elements have that class on them yet.
        const currentLatestMoveElement = document.getElementsByClassName(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE)[0] as HTMLDivElement;
        currentLatestMoveElement?.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
    }
}