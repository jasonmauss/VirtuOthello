/**
 * @remarks
 * This class models a player of the game and whether
 * they are black or white, human or computer
 * */

export enum playerType {
    Human,
    AI
};

export enum playerColor {
    black,
    white
};

export class OthelloPlayer {

    playerType: playerType;
    playerColor: playerColor    
    playerName: string;

    constructor(type:playerType, color:playerColor) {
        this.playerType = type;
        this.playerColor = color;
        this.playerName = type === playerType.AI ? 'AI' : 'Human';
    }
    
}