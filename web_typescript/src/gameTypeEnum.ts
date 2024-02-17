import * as constants from "./constants.js"

// This enum defines the four different types of games supported 
export enum gameType {
    humanVsHuman = 'HumanVsHuman', //constants.GAME_TYPE_HUMAN_VS_HUMAN,
    youAsBlack = 'YouAsBlack',
    youAsWhite = 'YouAsWhite',
    selfplay = 'SelfPlay'
};