import { gameType } from "./gameTypeEnum.js"
import { OthelloGameBoard } from "./OthelloGameBoard.js"
// This class represents the othello game being played.
// It contains properties and methods relevant to managing
// the game and being able to determine certain attributes
// needed to maintain the game board, etc.
export class OthelloGame {
     
    gameType: gameType;
    gameBoard: OthelloGameBoard;
    

    constructor (gameType:gameType) {
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard();
    }
}