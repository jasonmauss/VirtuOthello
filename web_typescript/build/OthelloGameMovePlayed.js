// This file models a move that was played in the game
// and some data about the move - which player made the
// move, which position it was played in, how many of
// the opponents pieces were flipped, etc.
export var moveType;
(function (moveType) {
    moveType[moveType["BlackPiece"] = 0] = "BlackPiece";
    moveType[moveType["WhitePiece"] = 1] = "WhitePiece";
})(moveType || (moveType = {}));
export class OthelloGameMovePlayed {
    constructor(moveType, position) {
        this._moveType = moveType;
        this._position = position;
    }
    get moveType() {
        return this._moveType;
    }
    set moveType(value) {
        this._moveType = value;
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
}
//# sourceMappingURL=OthelloGameMovePlayed.js.map