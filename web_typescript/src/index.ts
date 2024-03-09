import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js"
import { OthelloUtils } from "./OthellUtils.js";
import { OthelloPlayer, playerColor, playerType } from "./OthelloPlayer.js";

let _othelloGame:OthelloGame = new OthelloGame(gameType.humanVsHuman, []);


/**
 * @remarks
 * If the current game is in progress, or has ended,
 * prompt the user to confirm that they want to reset the board
 */
const isEndingGameInProgressOk = ():boolean => {
    return window.confirm('Are you sure you want to clear the board and start a new game?');
};

/**
 * @remarks
 * Initiates a new Human vs Human game
 */
const newHVHGame = ():void => {
    OthelloUtils.consoleLog('new Game Human vs Human');
    _othelloGame.performAllNewGameActions();
    _othelloGame.gameBoard.displayPlayableIndicators(constants.CSS_CLASS_NAME_BLACK);
};

/**
 * @remarks
 * Initiates a new You as Black game
 */
const newYABGame = ():void => {
    OthelloUtils.consoleLog('new Game You as Black');
    _othelloGame.performAllNewGameActions();
    _othelloGame.gameBoard.displayPlayableIndicators(constants.CSS_CLASS_NAME_BLACK);
};

/**
 * @remarks
 * Initiates a new You as White game
 */
const newYAWGame = ():void => {
    OthelloUtils.consoleLog('new Game You as White');
    _othelloGame.performAllNewGameActions();
    // Since this is a game of human (white) vs AI (black) and black
    // always moves first, star the game with an AI move
    _othelloGame.performAIMove(constants.CSS_CLASS_NAME_BLACK);
};

/**
 * @remarks
 * Initiates a new Self-play game
 */
const newSPLGame = ():void => {
    OthelloUtils.consoleLog('new Game Selfplay');
    _othelloGame.performAllNewGameActions();
    // Since this is an AI vs AI game, need something here to
    // kick off the game and keep it going.
    _othelloGame.performAIMove(constants.CSS_CLASS_NAME_BLACK);
    
};

/**
 * @remarks
 * The click handler method for the "Human vs Human" new game UI Button
 * @param event 
 */
const newGameHumanVsHumanClickHandler = (event:MouseEvent):void => {
    if(_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1:OthelloPlayer = new OthelloPlayer(playerType.Human, playerColor.black);
        let player2:OthelloPlayer = new OthelloPlayer(playerType.Human, playerColor.white);
        _othelloGame = new OthelloGame(gameType.humanVsHuman, [player1, player2]);
        newHVHGame();
    }
};

/**
 * @remarks
 * The click handler method for the "You as Black" new game UI Button
 * @param event 
 */
const newGameYouAsBlackClickHandler = (event:MouseEvent):void => {
    if(_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1:OthelloPlayer = new OthelloPlayer(playerType.Human, playerColor.black);
        let player2:OthelloPlayer = new OthelloPlayer(playerType.AI, playerColor.white);
        _othelloGame = new OthelloGame(gameType.youAsBlack, [player1, player2]);
        newYABGame();
    }
};

/**
 * @remarks
 * The click handler method for the "You as White" new game UI Button
 * @param event 
 */
const newGameYouAsWhiteClickHandler = (event:MouseEvent):void => {
    if(_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1:OthelloPlayer = new OthelloPlayer(playerType.AI, playerColor.black);
        let player2:OthelloPlayer = new OthelloPlayer(playerType.Human, playerColor.white);
        _othelloGame = new OthelloGame(gameType.youAsWhite, [player1, player2]);
        newYAWGame();
    }
};

/**
 * @remarks
 * The click handler method for the "Self Play" new game UI Button
 * @param event
 */
const newGameSelfPlayClickHandler = (event:MouseEvent):void => {
    if(_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1:OthelloPlayer = new OthelloPlayer(playerType.AI, playerColor.black);
        let player2:OthelloPlayer = new OthelloPlayer(playerType.AI, playerColor.white);
        _othelloGame = new OthelloGame(gameType.selfplay, [player1, player2]);
        newSPLGame();
    }
};

/**
 * @remarks
 * The click handler method for the various board positions
 * @param event 
 */
const boardPositionDivElementClickHandler = (event:MouseEvent):void => {
    // if a player was to click really fast, or double click the board, we don't
    // want to process another move until we have finished processing the move
    // that is in progress, so check for a move being in progress and returning
    // immediately if that's the case. 
    if(_othelloGame.moveIsInProgress) return;

    // if the element doesn't have either a "playable-black" or "playable-white"
    // class applied, it's not a valid move, so exit.
    const elementClicked:HTMLDivElement = (event?.target as HTMLDivElement);
    if(!elementClicked.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE_BLACK) &&
       !elementClicked.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE_WHITE))
        return;

    const boardPositionClicked:string = elementClicked.id;
    // Stop propagation since we don't care to handle the click event of any parent elements
    event.stopPropagation();
    OthelloUtils.consoleLog(event.target as HTMLElement);
    // set the game move stats to being in progress
    _othelloGame.moveIsInProgress = true;
    _othelloGame.performMove(boardPositionClicked, _othelloGame.getColorOfCurrentMove());
    _othelloGame.moveIsInProgress = false;
};

/**
 * @remarks
 * The click handler method for the "Show Move Log" UI checkbox
 * @param event the click event of the checkbox
 */
const toggleMoveLogVisibilityClickHandler = (event:MouseEvent):void => {
    const toggleVisibilityButton = event.target as HTMLButtonElement;
    console.log(toggleVisibilityButton.innerText);
    const movesListIsVisible = toggleVisibilityButton.innerText === 'Hide';
    const movesListSelectElement = 
            document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT) as HTMLSelectElement;
    if(movesListIsVisible) {
        movesListSelectElement.style.display = 'none';
        toggleVisibilityButton.innerText = 'Show'
    } else {
        movesListSelectElement.style.display = 'block';
        toggleVisibilityButton.innerText = 'Hide'
    }

};

/**
 * @remarks The click handler method for when option elements in the
 * 'Moves Played' select list are clicked on.
 * @param event The click event being handled
 */
const moveSelectedClickHandler = (event:Event):void => {
    const moveSelectOption = event.target as HTMLOptionElement;
    // Ensure there is not an empty value before calling highlight move
    if(moveSelectOption.value) {
        OthelloUtils.consoleLog('move selected for highlight: ' + moveSelectOption.value);
        _othelloGame.gameBoard.highlightMove(moveSelectOption.value);
    }
    
};

/**
 * @remarks The double click handler method for when an option element in
 * the 'Moves Played' select list gets double clicked, to roll back to that move
 * @param event The double click event being handled
 */
const moveSelectedDoubleclickHandler = (event:Event):void => {

    const moveSelectOption = event.target as HTMLOptionElement;
    // Ensure there is not an empty value before calling highlight move
    if(moveSelectOption.value && confirm('Are you sure you want to rollback to this move?')) {
        OthelloUtils.consoleLog('move selected for rollback: ' + moveSelectOption.value);
        _othelloGame.gameBoard.rollbackToMove(moveSelectOption.value);
    }
};

/**
 * @remarks We are using this event in order to differentiate between a single click and
 * a double click on the move select list option elements. Without a mechanism like this, 
 * it's almost impossible to handle the click and dblclick events correctly 
 * @param event The event that triggered the handler
 */
let waitingForDoubleClick:boolean = false;
let timeout:number | undefined = undefined;
let doubleClickDelay:number = 600; // the max milliseconds that almost any OS or browser implements by default for a double-click delay

const handleClickType = (event:Event): void => {
    if(waitingForDoubleClick) {
        clearTimeout(timeout);
        moveSelectedDoubleclickHandler(event);
        waitingForDoubleClick = false;
        return;
    }
    waitingForDoubleClick = true;
    timeout = setTimeout(() => {
        moveSelectedClickHandler(event);
        waitingForDoubleClick = false;
    }, doubleClickDelay)
    
};

/**
 * This section of the below wires up click event listeners to the handling methods above
 */

const hvhButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_HVH);
hvhButton?.addEventListener('click', newGameHumanVsHumanClickHandler);

const yabButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_YAB);
yabButton?.addEventListener('click', newGameYouAsBlackClickHandler);

const yawButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_YAW);
yawButton?.addEventListener('click', newGameYouAsWhiteClickHandler);

const spButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_SPL);
spButton?.addEventListener('click', newGameSelfPlayClickHandler);

const gameBoard = document.getElementById(constants.CSS_CLASS_NAME_BOARD);
gameBoard?.addEventListener('click', boardPositionDivElementClickHandler);

const toggleMoveLogVisibility = document.getElementById(constants.CSS_ELEMENT_ID_TOGGLE_MOVE_LOG);
toggleMoveLogVisibility?.addEventListener('click', toggleMoveLogVisibilityClickHandler);

const moveSelectList = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT) as HTMLSelectElement;
moveSelectList?.addEventListener('click', handleClickType);