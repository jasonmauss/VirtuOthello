import { OthelloGame } from "./OthelloGame.js";
import { newGameType, newGame } from "./gameTypeEnum.js";
import * as constants from "./constants.js"

// The startNewGame method is a method that can be called to
// initiaite a new game
const startNewGame = (gameTypeChoice: newGame):void => {
    switch(gameTypeChoice.type) {
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

const othelloGame:OthelloGame = new OthelloGame(newGameType.humanVsHuman);


const clearBoard = (): void => {
    const tableCellElements: HTMLCollectionOf<Element> = document.getElementsByClassName(constants.CSS_CLASS_NAME_CIRCLE);
    for(let cellElement of tableCellElements) {
        cellElement.classList.remove(constants.CSS_CLASS_NAME_WHITE);
        cellElement.classList.remove(constants.CSS_CLASS_NAME_BLACK);
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
};

const initializeNewGameBoard = (): void => {
    const blackElementOne = document.getElementById('e4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    const blackElementTwo = document.getElementById('d5')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
    const whiteElementOne = document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
    const whiteElementTwo = document.getElementById('e5')?.classList.add(constants.CSS_CLASS_NAME_WHITE);
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
};

const newSPLGame = ():void => {
    console.log('new Game Selfplay');
    performAllNewGameActions();
};

const newGameHumanVsHumanClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.humanVsHuman
    };
    startNewGame(game);
};

const newGameYouAsBlackClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.youAsBlack
    };
    startNewGame(game);
};

const newGameYouAsWhiteClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.youAsWhite
    };
    startNewGame(game);
};

const newGameSelfPlayClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
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