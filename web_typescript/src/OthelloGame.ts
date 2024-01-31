import { gameType } from "./gameTypeEnum.js"
import { OthelloGameBoard } from "./OthelloGameBoard.js"
import { OthelloGameMovePlayed } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js"
// This class represents the othello game being played.
// It contains properties and methods relevant to managing
// the game and being able to determine certain attributes
// needed to maintain the game board, etc.
export class OthelloGame {
     
    gameType: gameType;
    gameBoard: OthelloGameBoard;
    movesPlayed: OthelloGameMovePlayed[];

    constructor (gameType:gameType) {
        this.gameType = gameType;
        this.gameBoard = new OthelloGameBoard();
        this.movesPlayed = [];
    }


    /**
     * clears the moves played in the game
     * and also clears the move log list in the UI
     */
    public clearMovesPlayed = (): void => {
        this.movesPlayed = [];
        const movesListSelectElement: HTMLSelectElement = 
            document.getElementById(constants.CSS_ELEMENT_ID_MOVES_SELECT) as HTMLSelectElement;

        while(movesListSelectElement.options.length > 0)
            movesListSelectElement.options.remove(0);
    }

    /**
     *  @remarks
     *  performs all operations necessary to reset the game
     *  back to being a new game. Clears the board, clears moves
     *  played, etc.
     */
    public performAllNewGameActions = (): void => {
        this.gameBoard.clear();
        this.clearMovesPlayed();
        this.gameBoard.initializeNewGame();
    }

    /**
     *  @remarks
     *  Since black always plays first, When someone plays 
     *  a "You as white" (YAW) game, black (the computer) needs to play an
     *  initial move.
     */
    public performInitialBlackPieceMove = (): void => {
        document.getElementById('c4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
        document.getElementById('d4')?.classList.remove(constants.CSS_CLASS_NAME_WHITE);
        document.getElementById('d4')?.classList.add(constants.CSS_CLASS_NAME_BLACK);
        
        // this should get called after any move gets played
        this.gameBoard.displayPlayableIndicators();
    };
}