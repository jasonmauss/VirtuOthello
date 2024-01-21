import { OthelloGame } from "./OthelloGame.js";
import { newGameType } from "./gameTypeEnum.js";
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
    const tableCellElements = document.getElementsByClassName('circle');
    for (let cellElement of tableCellElements) {
        cellElement.classList.remove('white');
        cellElement.classList.remove('black');
    }
};
const clearMoveList = () => {
    const movesListSelectElement = document.getElementById('moves-select');
    while (movesListSelectElement.options.length > 0)
        movesListSelectElement.options.remove(0);
};
const performAllNewGameActions = () => {
    clearBoard();
    clearMoveList();
    initializeNewGameBoard();
};
const initializeNewGameBoard = () => {
    const blackElementOne = document.getElementById('e4')?.classList.add('black');
    const blackElementTwo = document.getElementById('d5')?.classList.add('black');
    const whiteElementOne = document.getElementById('d4')?.classList.add('white');
    const whiteElementTwo = document.getElementById('e5')?.classList.add('white');
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
const hvhButton = document.getElementById('btnNewGameHumanVsHuman');
hvhButton?.addEventListener('click', newGameHumanVsHumanClickHandler);
const yabButton = document.getElementById('btnNewGameAsBlack');
yabButton?.addEventListener('click', newGameYouAsBlackClickHandler);
const yawButton = document.getElementById('btnNewGameAsWhite');
yawButton?.addEventListener('click', newGameYouAsWhiteClickHandler);
const spButton = document.getElementById('btnNewGameSelfPlay');
spButton?.addEventListener('click', newGameSelfPlayClickHandler);
//# sourceMappingURL=index.js.map