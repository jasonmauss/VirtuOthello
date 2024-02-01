import { gameType } from "./gameTypeEnum.js"
import { OthelloGameBoard } from "./OthelloGameBoard.js"
import { OthelloGameMovePlayed, moveType } from "./OthelloGameMovePlayed.js";
import * as constants from "./constants.js"
import { OthelloUtils } from "./OthellUtils.js";
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
     * @remarks
     * 
     * @param boardPosition 
     * @param colorOfPieceToPlay 
     */
    public performMove = (boardPosition:string, colorOfPieceToPlay:string): void => {

        // a quick hack of logic to determine that the board position clicked on
        // is actually a valid place to play. This could be improved upon and made more bulletproof.
        // if(!document.getElementById(boardPosition)?.classList.contains(constants.CSS_CLASS_NAME_PLAYABLE)) return;

        // hide any currently playable indicators
        this.gameBoard.hidePlayableIndicators();

        const moveTypePlayed:moveType = colorOfPieceToPlay === constants.CSS_CLASS_NAME_BLACK
            ? moveType.BlackPiece
            : moveType.WhitePiece;

        const movePlayed = new OthelloGameMovePlayed(moveTypePlayed, boardPosition);

        // display the piece by adding the CSS class to it
        this.gameBoard.performMoveElementOperations(movePlayed);

        // call this so that the appropriate pieces get flipped
        const piecesFlipped = this.flipApplicablePiecesAfterMove(boardPosition, colorOfPieceToPlay);

        // Add the move to the log list
        this.gameBoard.AddMoveToLog(movePlayed, piecesFlipped);


        // call this afterwards so that the playable indicators are shown again, but for the other color
        // since it's the other colors turn now after the move has been played
        const oppositeColor = colorOfPieceToPlay === constants.CSS_CLASS_NAME_BLACK
        ? constants.CSS_CLASS_NAME_WHITE
        : constants.CSS_CLASS_NAME_BLACK;

        this.gameBoard.displayPlayableIndicators(oppositeColor);
    }

    /**
     * @remarks
     * This method changes tiles from black to white or vice-versa depending on
     * the move that was just played. It will look in 8 different directions
     * on the board - up/down/left/right and their 4 diagonol equivalents.
     * @param movePlayedBoardPosition
     */
    public flipApplicablePiecesAfterMove = (movePlayedBoardPosition:string, colorOfPiecePlayed:string): number => {

        OthelloUtils.consoleLog('flipping applicable pieces after move.');
        
        let piecesFlipped:number = 0;

        const whichColorToShowIndicatorsFor = colorOfPiecePlayed === constants.CSS_CLASS_NAME_BLACK
            ? constants.CSS_CLASS_NAME_WHITE
            : constants.CSS_CLASS_NAME_BLACK;

        return piecesFlipped;
    }

    /**
     *  @remarks
     *  Since black always plays first, When someone plays 
     *  a "You as white" (YAW) game, black (the computer) needs to play an
     *  initial move.
     */
    public performInitialBlackPieceMove = (): void => {
        this.performMove('c4', constants.CSS_CLASS_NAME_BLACK)
    };
}