import { OthelloGame } from "./OthelloGame.js";
import { gameType } from "./gameTypeEnum.js";
import * as constants from "./constants.js"

const _othelloGame:OthelloGame = new OthelloGame(gameType.humanVsHuman);

// The startNewGame method is a method that can be called to
// initiaite a new game
const startNewGame = (game: OthelloGame):void => {

    switch(game.gameType) {
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

const clearBoard = (): void => {
    const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
    const boardElements: HTMLCollectionOf<Element> = 
        board?.children as HTMLCollectionOf<Element>;
    for(let divElement of boardElements) {
        divElement.classList.remove(constants.CSS_CLASS_NAME_WHITE);
        divElement.classList.remove(constants.CSS_CLASS_NAME_BLACK);
        divElement.classList.remove(constants.CSS_CLASS_NAME_PLAYABLE);
        divElement.classList.remove(constants.CSS_CLASS_NAME_MOST_RECENT_MOVE);
    }
};

const clearMoveList = (): void => {
    const movesListSelectElement: HTMLSelectElement = document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT) as HTMLSelectElement;
    while(movesListSelectElement.options.length > 0)
        movesListSelectElement.options.remove(0);
}

const performAllNewGameActions = (): void => {
    clearBoard();
    clearMoveList();
    initializeNewGameBoard();
}

const performInitialBlackPieceMove = (): void => {
    document.getElementById('c4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    document.getElementById('d4')?.classList.remove(constants.CSS_CLASS_NAME_WHITE);
    document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    // 
};

const performInitialWhitePieceMove = (): void => {
    document.getElementById('c5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
    document.getElementById('d5')?.classList.remove(constants.CSS_CLASS_NAME_BLACK);
    document.getElementById('d5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
};

const initializeNewGameBoard = (): void => {
    const blackElementOne = document.getElementById('e4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    const blackElementTwo = document.getElementById('d5')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    const whiteElementOne = document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
    const whiteElementTwo = document.getElementById('e5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
};

const displayPlayableIndicators = (): void => {

};

const newHVHGame = ():void => {
    console.log('new Game Human vs Human');
    performAllNewGameActions();
};

const newYABGame = ():void => {
    console.log('new Game You as Black');
    performAllNewGameActions();
};

const newYAWGame = ():void => {
    console.log('new Game You as White');
    performAllNewGameActions();
    performInitialBlackPieceMove();
    displayPlayableIndicators();
};

const newSPLGame = ():void => {
    console.log('new Game Selfplay');
    performAllNewGameActions();
};

const newGameHumanVsHumanClickHandler = (event:MouseEvent):void => {
    const game:OthelloGame = new OthelloGame(gameType.humanVsHuman);
    startNewGame(game);
};

const newGameYouAsBlackClickHandler = (event:MouseEvent):void => {
    const game:OthelloGame = new OthelloGame(gameType.youAsBlack);
    startNewGame(game);
};

const newGameYouAsWhiteClickHandler = (event:MouseEvent):void => {
    const game:OthelloGame = new OthelloGame(gameType.youAsWhite);
    startNewGame(game);
};

const newGameSelfPlayClickHandler = (event:MouseEvent):void => {
    const game:OthelloGame = new OthelloGame(gameType.selfplay);
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