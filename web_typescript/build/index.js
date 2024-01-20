"use strict";
var newGameType;
(function (newGameType) {
    newGameType["humanVsHuman"] = "HVH";
    newGameType["youAsBlack"] = "YAB";
    newGameType["youAsWhite"] = "YAW";
    newGameType["selfplay"] = "SPL";
})(newGameType || (newGameType = {}));
;
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
const clearBoard = () => {
    const tableCellElements = document.getElementsByClassName('circle');
    for (let cellElement of tableCellElements) {
        cellElement.classList.remove('white');
        cellElement.classList.remove('black');
    }
};
const initializeNewGameBoard = () => {
    var _a, _b, _c, _d;
    const blackElementOne = (_a = document.getElementById('e4')) === null || _a === void 0 ? void 0 : _a.classList.add('black');
    const blackElementTwo = (_b = document.getElementById('d5')) === null || _b === void 0 ? void 0 : _b.classList.add('black');
    const whiteElementOne = (_c = document.getElementById('d4')) === null || _c === void 0 ? void 0 : _c.classList.add('white');
    const whiteElementTwo = (_d = document.getElementById('e5')) === null || _d === void 0 ? void 0 : _d.classList.add('white');
};
const newHVHGame = () => {
    console.log('new Game Human vs Human');
    clearBoard();
    initializeNewGameBoard();
};
const newYABGame = () => {
    console.log('new Game You as Black');
    clearBoard();
    initializeNewGameBoard();
};
const newYAWGame = () => {
    console.log('new Game You as White');
    clearBoard();
    initializeNewGameBoard();
};
const newSPLGame = () => {
    console.log('new Game Selfplay');
    clearBoard();
    initializeNewGameBoard();
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
hvhButton === null || hvhButton === void 0 ? void 0 : hvhButton.addEventListener('click', newGameHumanVsHumanClickHandler);
const yabButton = document.getElementById('btnNewGameAsBlack');
yabButton === null || yabButton === void 0 ? void 0 : yabButton.addEventListener('click', newGameYouAsBlackClickHandler);
const yawButton = document.getElementById('btnNewGameAsWhite');
yawButton === null || yawButton === void 0 ? void 0 : yawButton.addEventListener('click', newGameYouAsWhiteClickHandler);
const spButton = document.getElementById('btnNewGameSelfPlay');
spButton === null || spButton === void 0 ? void 0 : spButton.addEventListener('click', newGameSelfPlayClickHandler);
//# sourceMappingURL=index.js.map