import { OthelloGame } from "./OthelloGame.js";
import { newGameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js";
// The startNewGame method is a method that can be called to
// initiaite a new game
const startNewGame = (gameTypeChoice) => {
    switch (gameTypeChoice.type) {
        case newGameType.humanVsHuman:
            newHVHGame();
            break;
        case newGameType.youAsBlack:
            newYABGame();
            break;
        case newGameType.youAsWhite:
            newYAWGame();
            break;
        case newGameType.selfplay:
            newSPLGame();
            break;
        default:
            newHVHGame();
    }
};
const othelloGame = new OthelloGame(newGameType.humanVsHuman);
const clearBoard = () => {
    const tableCellElements = document.getElementsByClassName(constants.CSS_CLASS_NAME_CIRCLE);
    for (let cellElement of tableCellElements) {
        cellElement.classList.remove(constants.CSS_CLASS_NAME_WHITE);
        cellElement.classList.remove(constants.CSS_CLASS_NAME_BLACK);
    }
};
const clearMoveList = () => {
    const movesListSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT);
    while (movesListSelectElement.options.length > 0)
        movesListSelectElement.options.remove(0);
};
const performAllNewGameActions = () => {
    clearBoard();
    clearMoveList();
    initializeNewGameBoard();
};
const initializeNewGameBoard = () => {
    const blackElementOne = document.getElementById('e4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    const blackElementTwo = document.getElementById('d5')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    const whiteElementOne = document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
    const whiteElementTwo = document.getElementById('e5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
};
const newHVHGame = () => {
    console.log('new Game Human vs Human');
    performAllNewGameActions();
};
const newYABGame = () => {
    console.log('new Game You as Black');
    performAllNewGameActions();
};
const newYAWGame = () => {
    console.log('new Game You as White');
    performAllNewGameActions();
};
const newSPLGame = () => {
    console.log('new Game Selfplay');
    performAllNewGameActions();
};
const newGameHumanVsHumanClickHandler = (event) => {
    const game = {
        type: newGameType.humanVsHuman
    };
    startNewGame(game);
};
const newGameYouAsBlackClickHandler = (event) => {
    const game = {
        type: newGameType.youAsBlack
    };
    startNewGame(game);
};
const newGameYouAsWhiteClickHandler = (event) => {
    const game = {
        type: newGameType.youAsWhite
    };
    startNewGame(game);
};
const newGameSelfPlayClickHandler = (event) => {
    const game = {
        type: newGameType.selfplay
    };
    startNewGame(game);
};
const hvhButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_HVH);
hvhButton?.addEventListener('click', newGameHumanVsHumanClickHandler);
const yabButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_YAB);
yabButton?.addEventListener('click', newGameYouAsBlackClickHandler);
const yawButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_YAW);
yawButton?.addEventListener('click', newGameYouAsWhiteClickHandler);
const spButton = document.getElementById(constants.CSS_ELEMENT_ID_NEW_GAME_SPL);
spButton?.addEventListener('click', newGameSelfPlayClickHandler);
//# sourceMappingURL=index.js.map