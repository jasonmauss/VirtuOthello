import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js";
import { OthelloUtils } from "./OthellUtils.js";
import { OthelloPlayer, playerColor, playerType } from "./OthelloPlayer.js";
let _othelloGame = new OthelloGame(gameType.humanVsHuman, []);
/**
 * @remarks
 * If the current game is in progress, or has ended,
 * prompt the user to confirm that they want to reset the board
 */
const isEndingGameInProgressOk = () => {
    return window.confirm('Are you sure you want to clear the board and start a new game?');
};
/**
 * @remarks
 * Initiates a new Human vs Human game
 */
const newHVHGame = () => {
    OthelloUtils.consoleLog('new Game Human vs Human');
    _othelloGame.performAllNewGameActions();
};
/**
 * @remarks
 * Initiates a new You as Black game
 */
const newYABGame = () => {
    OthelloUtils.consoleLog('new Game You as Black');
    _othelloGame.performAllNewGameActions();
    _othelloGame.gameBoard.displayPlayableIndicators(constants.CSS_CLASS_NAME_BLACK);
};
/**
 * @remarks
 * Initiates a new You as White game
 */
const newYAWGame = () => {
    OthelloUtils.consoleLog('new Game You as White');
    _othelloGame.performAllNewGameActions();
    _othelloGame.performInitialBlackPieceMove();
};
/**
 * @remarks
 * Initiates a new Self-play game
 */
const newSPLGame = () => {
    OthelloUtils.consoleLog('new Game Selfplay');
    _othelloGame.performAllNewGameActions();
};
/**
 * @remarks
 * The click handler method for the "Human vs Human new game UI Button
 * @param event
 */
const newGameHumanVsHumanClickHandler = (event) => {
    if (_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1 = new OthelloPlayer(playerType.Human, playerColor.black);
        let player2 = new OthelloPlayer(playerType.Human, playerColor.white);
        _othelloGame = new OthelloGame(gameType.humanVsHuman, [player1, player2]);
        newHVHGame();
    }
};
/**
 * @remarks
 * The click handler method for the "You as Black" new game UI Button
 * @param event
 */
const newGameYouAsBlackClickHandler = (event) => {
    if (_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1 = new OthelloPlayer(playerType.Human, playerColor.black);
        let player2 = new OthelloPlayer(playerType.AI, playerColor.white);
        _othelloGame = new OthelloGame(gameType.youAsBlack, [player1, player2]);
        newYABGame();
    }
};
/**
 * @remarks
 * The click handler method for the "You as White" new game UI Button
 * @param event
 */
const newGameYouAsWhiteClickHandler = (event) => {
    if (_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1 = new OthelloPlayer(playerType.AI, playerColor.black);
        let player2 = new OthelloPlayer(playerType.Human, playerColor.white);
        _othelloGame = new OthelloGame(gameType.youAsWhite, [player1, player2]);
        newYAWGame();
    }
};
/**
 * @remarks
 * The click handler method for the "Self Play" new game UI Button
 * @param event
 */
const newGameSelfPlayClickHandler = (event) => {
    if (_othelloGame.gameIsInProgress && isEndingGameInProgressOk() || !_othelloGame.gameIsInProgress) {
        let player1 = new OthelloPlayer(playerType.AI, playerColor.black);
        let player2 = new OthelloPlayer(playerType.AI, playerColor.white);
        _othelloGame = new OthelloGame(gameType.selfplay, [player1, player2]);
        newSPLGame();
    }
};
/**
 * @remarks
 * The click handler method for the various board positions
 * @param event
 */
const boardPositionDivElementClickHandler = (event) => {
    // if a player was to click really fast, or double click the board, we don't
    // want to process another move until we have finished processing the move
    // that is in progress, so check for a move being in progress and returning
    // immediately if that's the case. 
    if (_othelloGame.moveIsInProgress)
        return;
    // if the element doesn't have either a "playable-black" or "playable-white"
    // class applied, it's not a valid move, so exit.
    const elementClicked = event?.target;
    if (!elementClicked.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE_BLACK) &&
        !elementClicked.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE_WHITE))
        return;
    const boardPositionClicked = elementClicked.id;
    // Stop propagation since we don't care to handle the click event of any parent elements
    event.stopPropagation();
    OthelloUtils.consoleLog(event.target);
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
const toggleMoveLogVisibilityClickHandler = (event) => {
    const toggleVisibilityButton = event.target;
    console.log(toggleVisibilityButton.innerText);
    const movesListIsVisible = toggleVisibilityButton.innerText === 'Hide';
    const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
    if (movesListIsVisible) {
        movesListSelectElement.style.display = 'none';
        toggleVisibilityButton.innerText = 'Show';
    }
    else {
        movesListSelectElement.style.display = 'block';
        toggleVisibilityButton.innerText = 'Hide';
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
const toggleMoveLogVisibility = document.getElementById(constants.CSS_ELEMENT_ID_TOGGLE_MOVE_LOG);
toggleMoveLogVisibility?.addEventListener('click', toggleMoveLogVisibilityClickHandler);
//# sourceMappingURL=index.js.map