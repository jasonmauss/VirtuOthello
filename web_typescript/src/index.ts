import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js"
import { OthelloUtils } from "./OthellUtils.js";

let _othelloGame:OthelloGame = new OthelloGame(gameType.humanVsHuman);


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
};

/**
 * @remarks
 * Initiates a new You as Black game
 */
const newYABGame = ():void => {
    OthelloUtils.consoleLog('new Game You as Black');
    _othelloGame.performAllNewGameActions();
};

/**
 * @remarks
 * Initiates a new You as White game
 */
const newYAWGame = ():void => {
    OthelloUtils.consoleLog('new Game You as White');
    _othelloGame.performAllNewGameActions();
    _othelloGame.performInitialBlackPieceMove();
};

/**
 * @remarks
 * Initiates a new Self-play game
 */
const newSPLGame = ():void => {
    OthelloUtils.consoleLog('new Game Selfplay');
    _othelloGame.performAllNewGameActions();
    
};

/**
 * @remarks
 * The click handler method for the "Human vs Human new game UI Button
 * @param event 
 */
const newGameHumanVsHumanClickHandler = (event:MouseEvent):void => {
    if(_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        _othelloGame = new OthelloGame(gameType.humanVsHuman);
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
        _othelloGame = new OthelloGame(gameType.youAsBlack);
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
        _othelloGame = new OthelloGame(gameType.youAsWhite);
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
        _othelloGame = new OthelloGame(gameType.selfplay);
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

    const boardPositionClicked = (event?.target as HTMLElement).id;
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
 * @param event - the click event of the checkbox
 */
const showMoveLogCheckboxClickHandler = (event:MouseEvent):void => {
    const checkbox = event.target as HTMLInputElement;
    const checkboxIsChecked = checkbox.checked;
    const moveListContainer = 
            document.getElementsByClassName(constants.CSS_CLASS_NAME_MOVES_CONTAINER)[0] as HTMLDivElement;
    if(checkboxIsChecked) {
        moveListContainer.style.display = 'block';
    } else {
        moveListContainer.style.display = 'none';
    }
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

const showMoveLogCheckbox = document.getElementById(constants.CSS_ELEMENT_ID_SHOW_MOVES_CHK);
showMoveLogCheckbox?.addEventListener('click', showMoveLogCheckboxClickHandler);
