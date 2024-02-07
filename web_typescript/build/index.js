import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js";
import { OthelloUtils } from "./OthellUtils.js";
let _othelloGame = new OthelloGame(gameType.humanVsHuman);
/**
 * @remarks
 * Initiates a new Human vs Human game
 */
const newHVHGame = () => {
    console.log('new Game Human vs Human');
    _othelloGame.performAllNewGameActions();
};
/**
 * @remarks
 * Initiates a new You as Black game
 */
const newYABGame = () => {
    console.log('new Game You as Black');
    _othelloGame.performAllNewGameActions();
};
/**
 * @remarks
 * Initiates a new You as White game
 */
const newYAWGame = () => {
    console.log('new Game You as White');
    _othelloGame.performAllNewGameActions();
    _othelloGame.performInitialBlackPieceMove();
};
/**
 * @remarks
 * Initiates a new Self-play game
 */
const newSPLGame = () => {
    console.log('new Game Selfplay');
    _othelloGame.performAllNewGameActions();
};
/**
 * @remarks
 * The click handler method for the "Human vs Human new game UI Button
 * @param event
 */
const newGameHumanVsHumanClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.humanVsHuman);
    newHVHGame();
};
/**
 * @remarks
 * The click handler method for the "You as Black" new game UI Button
 * @param event
 */
const newGameYouAsBlackClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.youAsBlack);
    newYABGame();
};
/**
 * @remarks
 * The click handler method for the "You as White" new game UI Button
 * @param event
 */
const newGameYouAsWhiteClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.youAsWhite);
    newYAWGame();
};
/**
 * @remarks
 * The click handler method for the "Self Play" new game UI Button
 * @param event
 */
const newGameSelfPlayClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.selfplay);
    newSPLGame();
};
/**
 * @remarks
 * The click handler method for the various board positions
 * @param event
 */
const boardPositionDivElementClickHandler = (event) => {
    const boardPositionClicked = (event?.target).id;
    event.stopPropagation();
    OthelloUtils.consoleLog(event.target);
    _othelloGame.performMove(boardPositionClicked, _othelloGame.getColorOfCurrentMove());
};
/**
 * @remarks
 * The click handler method for the "Show Move Log" UI checkbox
 * @param event - the click event of the checkbox
 */
const showMoveLogCheckboxClickHandler = (event) => {
    const checkbox = event.target;
    const checkboxIsChecked = checkbox.checked;
    const moveListContainer = document.getElementsByClassName(constants.CSS_CLASS_NAME_MOVES_CONTAINER)[0];
    if (checkboxIsChecked) {
        moveListContainer.style.display = 'block';
    }
    else {
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
//# sourceMappingURL=index.js.map