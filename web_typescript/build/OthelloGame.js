import { OthelloGameBoard } from "./OthelloGameBoard.js";
// This class represents the othello game being played.
// It contains properties and methods relevant to managing
// the game and being able to determine certain attributes
// needed to maintain the game board, etc.
export class OthelloGame {
    constructor(gameType) {
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard();
    }
}
//# sourceMappingURL=OthelloGame.js.map