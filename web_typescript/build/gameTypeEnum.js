import * as constants from "./constants.js";
// This enum defines the four different types of games supported 
export var newGameType;
(function (newGameType) {
    newGameType[newGameType["humanVsHuman"] = constants.GAME_TYPE_HUMAN_VS_HUMAN] = "humanVsHuman";
    newGameType[newGameType["youAsBlack"] = constants.GAME_TYPE_YOU_AS_BLACK] = "youAsBlack";
    newGameType[newGameType["youAsWhite"] = constants.GAME_TYPE_YOU_AS_WHITE] = "youAsWhite";
    newGameType[newGameType["selfplay"] = constants.GAME_TYPE_SELF_PLAY] = "selfplay";
})(newGameType || (newGameType = {}));
;
//# sourceMappingURL=gameTypeEnum.js.map