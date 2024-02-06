import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js";
import { OthelloUtils } from "./OthellUtils.js";
let _othelloGame = new OthelloGame(gameType.humanVsHuman);
const newHVHGame = () => {
    console.log('new Game Human vs Human');
    _othelloGame.performAllNewGameActions();
};
const newYABGame = () => {
    console.log('new Game You as Black');
    _othelloGame.performAllNewGameActions();
};
const newYAWGame = () => {
    console.log('new Game You as White');
    _othelloGame.performAllNewGameActions();
    _othelloGame.performInitialBlackPieceMove();
};
const newSPLGame = () => {
    console.log('new Game Selfplay');
    _othelloGame.performAllNewGameActions();
};
const newGameHumanVsHumanClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.humanVsHuman);
    newHVHGame();
};
const newGameYouAsBlackClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.youAsBlack);
    newYABGame();
};
const newGameYouAsWhiteClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.youAsWhite);
    newYAWGame();
};
const newGameSelfPlayClickHandler = (event) => {
    _othelloGame = new OthelloGame(gameType.selfplay);
    newSPLGame();
};
const boardPositionDivElementClickHandler = (event) => {
    const boardPositionClicked = (event?.target).id;
    event.stopPropagation();
    OthelloUtils.consoleLog(event.target);
    _othelloGame.performMove(boardPositionClicked, _othelloGame.getColorOfCurrentMove());
};
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