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
const newHVHGame = () => {
    console.log('new Game Human vs Human');
};
const newYABGame = () => {
    console.log('new Game You as Black');
};
const newYAWGame = () => {
    console.log('new Game You as White');
};
const newSPLGame = () => {
    console.log('new Game Selfplay');
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