import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js";
let _othelloGame = new OthelloGame(gameType.humanVsHuman);
// The startNewGame method is a method that can be called to
// initiaite a new game
const startNewGame = (game) => {
    _othelloGame = game;
    switch (game.gameType) {
        case gameType.humanVsHuman:
            newHVHGame();
            break;
        case gameType.youAsBlack:
            newYABGame();
            break;
        case gameType.youAsWhite:
            newYAWGame();
            break;
        case gameType.selfplay:
            newSPLGame();
            break;
        default:
            newHVHGame();
    }
};
const performAllNewGameActions = () => {
    _othelloGame.gameBoard.clear();
    _othelloGame.clearMovesPlayed();
    _othelloGame.gameBoard.initializeNewGame();
};
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
    const game = new OthelloGame(gameType.humanVsHuman);
    startNewGame(game);
};
const newGameYouAsBlackClickHandler = (event) => {
    const game = new OthelloGame(gameType.youAsBlack);
    startNewGame(game);
};
const newGameYouAsWhiteClickHandler = (event) => {
    const game = new OthelloGame(gameType.youAsWhite);
    startNewGame(game);
};
const newGameSelfPlayClickHandler = (event) => {
    const game = new OthelloGame(gameType.selfplay);
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