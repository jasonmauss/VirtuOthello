export enum newGameType {
    humanVsHuman = 'HVH',
    youAsBlack = 'YAB',
    youAsWhite = 'YAW',
    selfplay = 'SPL'
};

export interface newGame {
    type: newGameType;
}

export const startNewGame = (gameTypeChoice: newGame):void => {
    switch(gameTypeChoice.type) {
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