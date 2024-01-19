enum newGameType {
    humanVsHuman = 'HVH',
    youAsBlack = 'YAB',
    youAsWhite = 'YAW',
    selfplay = 'SPL'
};

interface newGame {
    type: newGameType;
}

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

const newHVHGame = ():void => {
    console.log('new Game Human vs Human');
};

const newYABGame = ():void => {
    console.log('new Game You as Black');
};

const newYAWGame = ():void => {
    console.log('new Game You as White');
};

const newSPLGame = ():void => {
    console.log('new Game Selfplay');
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