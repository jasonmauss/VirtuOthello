import * as constants from "./constants.js"

/**
 * @remarks
 * The static methods in this class are a collection of methods
 * related to determining which pieces need to have a certain action
 * performed on them (being flipped, showing an indicator, etc)
 */
export class MoveUtils {

    constructor() {}

    // 
    public static getPositionsToFlip = (colorOfPiecePlayed:string, movePlayedBoardPosition:string) : string[] => {

        // break down the board position passed in and take the column character (A through H)
        // and the row number (1 through 8) and use those to perform the searching
        const columnChar = movePlayedBoardPosition.charAt(0);
        const columnCharAsNum = movePlayedBoardPosition.charCodeAt(0);
        const rowNum = Number(movePlayedBoardPosition.charAt(1));

        // search up in the current column if the move played was on
        // row 3 through 8 because a move played on row 2 can't flip
        // any pieces above it.
        if(rowNum > 2) {
            
        }

        

        return [];
    }
}