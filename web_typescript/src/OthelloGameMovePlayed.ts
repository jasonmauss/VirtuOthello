// This file models a move that was played in the game
// and some data about the move - which player made the
// move, which position it was played in, how many of
// the opponents pieces were flipped, etc.
export enum moveType
{
    BlackPiece,
    WhitePiece
}

export class OthelloGameMovePlayed {

    constructor(moveType: moveType, position: string) {
        this._moveType = moveType;
        this._position = position;
    }

    private _moveType : moveType;
    private _position: string;

    public get moveType() : moveType {
        return this._moveType;
    }

    public set moveType(value : moveType) {
        this._moveType = value;
    }

    public get position(): string {
        return this._position;
    }

    public set position(value: string) {
        this._position = value;
    }
    

}