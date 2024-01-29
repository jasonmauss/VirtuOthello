import * as constants from "./constants.js"

// This enum defines the four different types of games supported 
export enum gameType {
    humanVsHuman = constants.GAME_TYPE_HUMAN_VS_HUMAN,
    youAsBlack = constants.GAME_TYPE_YOU_AS_BLACK,
    youAsWhite = constants.GAME_TYPE_YOU_AS_WHITE,
    selfplay = constants.GAME_TYPE_SELF_PLAY
};