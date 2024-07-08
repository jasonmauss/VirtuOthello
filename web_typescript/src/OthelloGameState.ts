import * as constants from "./constants.js"

// This class represents the state of the game, (where the pieces are on the board)
// using a two-dimensional array. Representing the state this way allows us to pass
// the state to methods that can perform potential future moves and allow the AI
// player to  determine which move(s) would be most advantageous.
export class OthelloGameState{

    boardState: number[][];
    currentPlayerColor: string;
    currentPlayerAsNumber: number;

    constructor () {
        this.boardState = this.getEmptyBoardState();
        // these next two values get set to the black color player
        // since the rule of Othello is that black plays first
        this.currentPlayerColor = constants.CSS_CLASS_NAME_BLACK;
        this.currentPlayerAsNumber = constants.BLACK_PLAYER_NUMBER;
    }

    // represents a new game board state where each cell has a zero
    getEmptyBoardState = (): number[][] => {
        const newBoard:number[][] = [];
        for(let i = 0; i < constants.GAME_BOARD_ROWS; i++) {
            newBoard.push([]);
            for(let j = 0; j < constants.GAME_BOARD_COLUMNS; j++) {
                newBoard[i].push(0);
            }
        }

        return newBoard;
    }

    initializeNewGameBoardState = (): void => {
        this.boardState[3][3] = 1;
        this.boardState[3][4] = -1;
        this.boardState[4][3] = -1;
        this.boardState[4][4] = 1;
        
    }
}