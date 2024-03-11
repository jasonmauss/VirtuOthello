import { OthelloGame } from "./OthelloGame";
import { OthelloGameBoard } from "./OthelloGameBoard";

const boardPositionValueMap = [
    [120, -20, 20,  5,  5, 20, -20, 120],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [ 20,  -5, 15,  3,  3, 15,  -5,  20],
    [  5,  -5,  3,  3,  3,  3,  -5,   5],
    [  5,  -5,  3,  3,  3,  3,  -5,   5],
    [ 20,  -5, 15,  3,  3, 15,  -5,  20],
    [-20, -40, -5, -5, -5, -5, -40, -20],
    [120, -20, 20,  5,  5, 20, -20, 120],
];

export class OthelloAI {

    alpha:number = Number.NEGATIVE_INFINITY;
    beta:number = Number.POSITIVE_INFINITY;
    

    constructor() {

    }

    /**
     * @remarks: Minimax uses the minimax algorithm to compute the best move
     * @param gameBoard The state of the game board so that evaluations can be made
     * @param depth The depth we want to take move evaluations to
     * @param alpha one part of the alpha beta tree pruning
     * @param beta the other part of the alpha beta tree pruning
     * 
     */
    minimax = (gameBoard:OthelloGameBoard, depth:number, alpha:number, beta:number):number => {

        return 0;

    }

    evaluateMove = (gameboard:OthelloGameBoard):number => {
        return 0;

    }

    cloneGameBoard = (gameBoardToClone:OthelloGameBoard):OthelloGameBoard => {

    }
    
};