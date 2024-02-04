import * as constants from "./constants.js";
/**
 * @remarks
 * The static methods in this class are a collection of methods
 * related to determining which pieces need to have a certain action
 * performed on them (being flipped, showing an indicator, etc)
 */
export class MoveUtils {
    constructor() { }
}
// 
MoveUtils.getPositionsToFlip = (colorOfPiecePlayed, movePlayedBoardPosition) => {
    // break down the board position passed in and take the column character (A through H)
    // and the row number (1 through 8) and use those to perform the searching
    const columnChar = movePlayedBoardPosition.charAt(0);
    const columnCharAsNum = movePlayedBoardPosition.charCodeAt(0);
    const rowNum = Number(movePlayedBoardPosition.charAt(1));
    // search up in the current column if the move played was on
    // row 3 through 8 because a move played on row 2 can't flip
    // any pieces above it. Also only search up to the left or up
    // to the right if this condition is met
    if (rowNum > 2) {
        if (columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
            // go ahead and search up and left diagonally
        }
        if (columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
            // go ahead and search up and right diagonally
        }
    }
    // search down in the current column if the move played was
    // on row 1 through 6 because a move played on row 7 can't 
    // flip any pieces below it. Also only search down to the left
    // or down to the right if this condition is met.
    if (rowNum < 7) {
        if (columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
            // go ahead and search down and left diagonally
        }
        if (columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
            // go ahead and search down and right diagonally 
        }
    }
    // search to the left in the current row if the move played
    // was on column c or greater because a move played on column
    // B can't flip any pieces to the left of it.
    if (columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
    }
    // search to the right in the current row if the move played
    // was on column f or lesser because a move played on column
    // G can't flip any pieces to the right of it.
    if (columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
    }
    return [];
};
/**
 * @remarks
 * Translates a board position like "12" to the Othello version or what's
 * needed for the Element ID selection like "A2"
 * @param rowNum
 * @param columnCharAsNum
 */
MoveUtils.getBoardPosition = (rowNum, columnCharAsNum) => {
    return String.fromCharCode(columnCharAsNum) + rowNum.toString();
};
//# sourceMappingURL=MoveUtils.js.map