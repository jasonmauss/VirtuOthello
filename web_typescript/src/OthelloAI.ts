import { OthelloGame } from "./OthelloGame";
import { OthelloGameBoard } from "./OthelloGameBoard";
import * as constants from "./constants.js"

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

const boardPositionsValueMapByPositions = {
    a1: 120, b1: -20, c1: 20, d1: 5,  e1: 5,  f1: 20, g1: -20, h1: 120,
    a2: -20, b2: -40, c2: -5, d2: -5, e2: -5, f2: -5, g2: -40, h2: -20,
    a3: 20,  b3: -5,  c3: 15, d3: 3,  e3: 3,  f3: 15, g3: -5,  h3: 20,
    a4: 5,   b4: -5,  c4: 3,  d4: 3,  e4: 3,  f4: 15, g4: -5,  h4: 5,
    a5: 5,   b5: -5,  c5: 3,  d5: 3,  e5: 3,  f5: 15, g5: -5,  h5: 5,
    a6: 20,  b6: -5,  c6: 15, d6: 3,  e6: 3,  f6: 15, g6: -5,  h6: 20,
    a7: -20, b7: -40, c7: -5, d7: -5, e7: -5, f7: -5, g7: -40, h7: -20,
    a8: 120, b8: -20, c8: 20, d8: 5,  e8: 5,  f8: 20, g8: -20, h8: 120
}

export class OthelloAI {

    alpha:number = Number.NEGATIVE_INFINITY;
    beta:number = Number.POSITIVE_INFINITY;
    optimalMove:string = '';
    defaultDepth:number = constants.DEFAULT_AI_DEPTH;
    othelloGame:OthelloGame;

    constructor(othelloGame:OthelloGame) {
        this.othelloGame = othelloGame;
    }

    makeMove = ():string => {

        return '';
        
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

    cloneGameBoard = (gameBoardToClone:OthelloGameBoard):OthelloGameBoard|null => {
        return null;
    }

};