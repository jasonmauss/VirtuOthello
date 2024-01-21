
// This enum defines the four different types of games supported 
export enum newGameType {
    humanVsHuman = 'HVH',
    youAsBlack = 'YAB',
    youAsWhite = 'YAW',
    selfplay = 'SPL'
};

export interface newGame {
    type: newGameType;
}