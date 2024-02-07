import { OthelloUtils } from "./OthellUtils.js";
import * as constants from "./constants.js"

/**
 * @remarks
 * The static methods in this class are a collection of methods
 * related to determining which pieces need to have a certain action
 * performed on them (being flipped, showing an indicator, etc)
 */
export class MoveUtils {

    constructor() {}

    /**
     * @remarks
     * For a given color (black or white), determines which board positions should have 
     * playable indicators shown, based on where pieces exist and which colors they are
     * @returns a string array containing board positions where playable indicators should be shown
     */
    static getPositionsForPlayableIndicators = (forWhichColorPlayer:string):string[] => {
        
        // Use this Set to keep track of positions we've found so we don't send back
        // any duplicate board positions. Will convert it to an array as the return value
        const positionsFound:Set<string> = new Set<string>();

        // start by getting a collection of elements that match (have the css class) for the
        // color passed in.
        const boardPositionsWithColor: NodeListOf<Element> = OthelloUtils.boardPositionsByClassNames(forWhichColorPlayer);
        const oppositeColor:string = OthelloUtils.getOppositeColor(forWhichColorPlayer);

        for(let position of boardPositionsWithColor) {
            const columnChar:string = position.id.charAt(0);
            const columnCharAsNum:number = position.id.charCodeAt(0);
            const rowNum:number = Number(position.id.charAt(1));
            

        }

        return Array.from(positionsFound);
    };

    /**
     * @remarks
     * Based on the color played and the position it was played in, determine which pieces 
     * need to be "flipped" to the color that was just played
     * @param colorOfPiecePlayed what color made the move
     * @param movePlayedBoardPosition what position on the board it was played in
     * @returns an array of strings that are board positions that should be flipped
     */
    static getPositionsToFlip = (colorOfPiecePlayed:string, movePlayedBoardPosition:string) : string[] => {

        // break down the board position passed in and take the column character (A through H)
        // and the row number (1 through 8) and use those to perform the searching
        const columnChar:string = movePlayedBoardPosition.charAt(0);
        const columnCharAsNum:number = movePlayedBoardPosition.charCodeAt(0);
        const rowNum:number = Number(movePlayedBoardPosition.charAt(1));
        const oppositeColorOfPiecePlayed = OthelloUtils.getOppositeColor(colorOfPiecePlayed);
        const positionsToFlip:string[] = [];

        // hold board positions that might need to be flipped
        // but we won't know for sure until we encounter colors
        // at certain board positions.
        let potentialFlips:string[] = []; 

        // search up in the current column if the move played was on
        // row 3 through 8 because a move played on row 2 can't flip
        // any pieces above it. Also only search up to the left or up
        // to the right if this condition is met
        if(rowNum > 2) {
            // If there is a piece above the one played and it's the opposite color...
            if(MoveUtils.getColorAtBoardPosition(rowNum - 1, columnChar) === oppositeColorOfPiecePlayed) {
                // add it to potential flips and...
                potentialFlips.push(columnChar + (rowNum - 1).toString());
                // then start a loop that keeps going up the current column and...
                for(let row = rowNum - 2; row > 0; --row) {
                    // as long as the board position contains the opposite color...
                    if(MoveUtils.getColorAtBoardPosition(row, columnChar) === oppositeColorOfPiecePlayed) {
                        // add that board position to potential flips.
                        potentialFlips.push(columnChar + (row).toString());
                    }
                    // If we encounter a board position in the current column that matches the color of
                    // the piece played, we know we need to add all the pieces we've been tracking in
                    // the potential flips to 'positionsToFlip' array, clear out the potential flips array,
                    // and exit the for loop we're in.
                    if(MoveUtils.getColorAtBoardPosition(row, columnChar) === colorOfPiecePlayed) {
                        positionsToFlip.push(...potentialFlips);
                        potentialFlips = [];
                        break;
                    }
                }
            }

            if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
                // go ahead and search up and left diagonally

            }

            if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                // go ahead and search up and right diagonally
            }
        }

        // search down in the current column if the move played was
        // on row 1 through 6 because a move played on row 7 can't 
        // flip any pieces below it. Also only search down to the left
        // or down to the right if this condition is met.
        if(rowNum < 7) {

            if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
                // go ahead and search down and left diagonally
            }

            if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                // go ahead and search down and right diagonally 
            }
        }

        // search to the left in the current row if the move played
        // was on column c or greater because a move played on column
        // B can't flip any pieces to the left of it.
        if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {

        }

        // search to the right in the current row if the move played
        // was on column f or lesser because a move played on column
        // G can't flip any pieces to the right of it.
        if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {

        }

        return positionsToFlip;
    }

    /**
     * @remarks
     * Translates a board position like "97,2" to the Othello version or what's
     * needed for the Element ID selection like "a2"
     * @param rowNum the number of row on the board
     * @param columnCharAsNum the charCode-based column digit, e.g. 97 for lower-case a, 98 for 'b', etc.
     */
    static getBoardPosition = (rowNum:number, columnCharAsNum:number):string => {
        return String.fromCharCode(columnCharAsNum) + rowNum.toString();
    }

    /**
     * @remarks
     * Retrieves the color (or lack thereof) at a certain board position
     * @param rowNum the row of the board position
     * @param columnChar the column of the board position
     */
    static getColorAtBoardPosition = (rowNum:number, columnChar:string):string => {
        const boardElement = document.getElementById(columnChar + rowNum.toString());
        if(boardElement?.classList.contains(constants.CSS_CLASS_NAME_BLACK)) return constants.CSS_CLASS_NAME_BLACK;
        if(boardElement?.classList.contains(constants.CSS_CLASS_NAME_WHITE)) return constants.CSS_CLASS_NAME_WHITE;
        return '';
    }
}