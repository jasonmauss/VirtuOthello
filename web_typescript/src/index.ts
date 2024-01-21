import { OthelloGame } from "./OthelloGame.js";
import { newGameType, newGame } from "./gameTypeEnum.js";


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
    const tableCellElements: HTMLCollectionOf<Element> = document.getElementsByClassName('circle');
    for(let cellElement of tableCellElements) {
        cellElement.classList.remove('white');
        cellElement.classList.remove('black');
    }
};

const clearMoveList = (): void => {
    const movesListSelectElement: HTMLSelectElement = document.getElementById('moves-select') as HTMLSelectElement;
    while(movesListSelectElement.options.length > 0)
        movesListSelectElement.options.remove(0);
}

const performAllNewGameActions = (): void => {
    clearBoard();
    clearMoveList();
    initializeNewGameBoard();
}

const initializeNewGameBoard = (): void => {
    const blackElementOne = document.getElementById('e4')?.classList.add('black');
    const blackElementTwo = document.getElementById('d5')?.classList.add('black');
    const whiteElementOne = document.getElementById('d4')?.classList.add('white');
    const whiteElementTwo = document.getElementById('e5')?.classList.add('white');
}

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
}

const newGameYouAsBlackClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.youAsBlack
    };
    startNewGame(game);
}

const newGameYouAsWhiteClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.youAsWhite
    };
    startNewGame(game);
}

const newGameSelfPlayClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.selfplay
    };
    startNewGame(game);
}

const hvhButton = document.getElementById('btnNewGameHumanVsHuman');
hvhButton?.addEventListener('click', newGameHumanVsHumanClickHandler);

const yabButton = document.getElementById('btnNewGameAsBlack');
yabButton?.addEventListener('click', newGameYouAsBlackClickHandler);

const yawButton = document.getElementById('btnNewGameAsWhite');
yawButton?.addEventListener('click', newGameYouAsWhiteClickHandler);

const spButton = document.getElementById('btnNewGameSelfPlay');
spButton?.addEventListener('click', newGameSelfPlayClickHandler);