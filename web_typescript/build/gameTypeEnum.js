import * as constants from "./constants.js";
// This enum defines the four different types of games supported 
export var gameType;
(function (gameType) {
    gameType[gameType["humanVsHuman"] = constants.GAME_TYPE_HUMAN_VS_HUMAN] = "humanVsHuman";
    gameType[gameType["youAsBlack"] = constants.GAME_TYPE_YOU_AS_BLACK] = "youAsBlack";
    gameType[gameType["youAsWhite"] = constants.GAME_TYPE_YOU_AS_WHITE] = "youAsWhite";
    gameType[gameType["selfplay"] = constants.GAME_TYPE_SELF_PLAY] = "selfplay";
})(gameType || (gameType = {}));
;
//# sourceMappingURL=gameTypeEnum.js.map