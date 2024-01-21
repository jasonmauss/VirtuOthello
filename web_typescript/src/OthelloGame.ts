import { newGameType } from "./gameTypeEnum"
// This class represents the othello game being played.
// It contains properties and methods relevant to managing
// the game and being able to determine certain attributes
// needed to maintain the game board, etc.
export class OthelloGame {
     
    gameType: newGameType;

    constructor (gameType:newGameType) {
        this.gameType = gameType;
    }
}