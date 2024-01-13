export var newGameType;
(function (newGameType) {
    newGameType["humanVsHuman"] = "HVH";
    newGameType["youAsBlack"] = "YAB";
    newGameType["youAsWhite"] = "YAW";
    newGameType["selfplay"] = "SPL";
})(newGameType || (newGameType = {}));
;
export const startNewGame = (gameTypeChoice) => {
    switch (gameTypeChoice.type) {
        case newGameType.humanVsHuman:
            newHVHGame();
        case newGameType.youAsBlack:
            newYABGame();
        case newGameType.youAsWhite:
            newYAWGame();
        case newGameType.selfplay:
            newSPLGame();
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
