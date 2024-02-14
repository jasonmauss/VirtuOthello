/**
 * @remarks
 * This class models a player of the game and whether
 * they are black or white, human or computer
 * */
export var playerType;
(function (playerType) {
    playerType[playerType["Human"] = 0] = "Human";
    playerType[playerType["AI"] = 1] = "AI";
})(playerType || (playerType = {}));
;
export var playerColor;
(function (playerColor) {
    playerColor[playerColor["black"] = 0] = "black";
    playerColor[playerColor["white"] = 1] = "white";
})(playerColor || (playerColor = {}));
;
export class OthelloPlayer {
    constructor(type, color) {
        this.playerType = type;
        this.playerColor = color;
        this.playerName = type === playerType.AI ? 'AI' : 'Human';
    }
}
//# sourceMappingURL=OthelloPlayer.js.map