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
     * An easy way to perform "subtraction" on a column character without
     * involving charCode math
     * @param char the current character
     * @returns the character that comes before the character passed to the method
     */
    static subtractColumnChar = (char:string):string => {
        if(char === 'h') return 'g';
        if(char === 'g') return 'f';
        if(char === 'f') return 'e';
        if(char === 'e') return 'd';
        if(char === 'd') return 'c';
        if(char === 'c') return 'b';
        if(char === 'b') return 'a';
        return '';
    }

    /**
     * @remarks
     * An easy way to perform "addition" on a column character without
     * involving charCode math
     * @param char the current character
     * @returns the character that comes after the character passed to the method
     */
    static addColumnChar = (char:string):string => {
        if(char === 'a') return 'b';
        if(char === 'b') return 'c';
        if(char === 'c') return 'd';
        if(char === 'd') return 'e';
        if(char === 'e') return 'f';
        if(char === 'f') return 'g';
        if(char === 'g') return 'h';
        return '';
    }

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
            
            // search up in the current column if the row of the position
            // is row 3 through 8 - because a move can only be played above
            // the current position if there's an opposite piece color above it
            // as well as an empty position above it (so 2 spots above it)
            if(rowNum > constants.MIN_ROW_NUM + 1) {

                if(this.getColorAtBoardPosition(rowNum - 1, columnChar) === oppositeColor) {
                    // start searching until you find an empty board position
                    for(let row = rowNum - 2; row > 0; --row) {
                        // empty string returned indicates no piece in the board position
                        if(this.getColorAtBoardPosition(row, columnChar) === '') {
                            positionsFound.add(columnChar + row.toString());
                            break;
                        }
                        // if we end up finding the same color again before finding an empty
                        // board position then exit the loop
                        if(this.getColorAtBoardPosition(row, columnChar) === forWhichColorPlayer) {
                            break;
                        }
                    }
                }

                if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
                    // go ahead and search up and left diagonally if we are at least as far right as the 'c' column
                    if(this.getColorAtBoardPosition(rowNum - 1, this.subtractColumnChar(columnChar)) === oppositeColor) {
                        let curColumnChar:string = this.subtractColumnChar(columnChar);
                        for(let row = rowNum - 2; row > 0 && curColumnChar !== ''; --row) {
                            curColumnChar = this.subtractColumnChar(curColumnChar);
                            if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                                positionsFound.add(curColumnChar + row.toString());
                                break;
                            }
                            // if we end up finding the same color again before finding an empty
                            // board position then exit the loop
                            if(this.getColorAtBoardPosition(row, curColumnChar) === forWhichColorPlayer) {
                                break;
                            }
                        }
                    }
                }
    
                if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                    // go ahead and search up and right diagonally if we are at least as far left as the 'f' column
                    if(this.getColorAtBoardPosition(rowNum - 1, this.addColumnChar(columnChar)) === oppositeColor) {
                        let curColumnChar:string = this.addColumnChar(columnChar);
                        for(let row = rowNum - 2; row > 0 && curColumnChar !== ''; --row) {
                            curColumnChar = this.addColumnChar(curColumnChar);
                            if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                                positionsFound.add(curColumnChar + row.toString());
                                break;
                            }
                            // if we end up finding the same color again before finding an empty
                            // board position then exit the loop
                            if(this.getColorAtBoardPosition(row, curColumnChar) === forWhichColorPlayer) {
                                break;
                            }
                        }
                    }
                }

            }

            // search down in the current column if the piece is
            // on row 1 through 6 because a piece on row 7 or 8 doesn't
            // have enough room to play on a position below it. Also only search down to the left
            // or down to the right if this "row 1-6" condition is met.
            if(rowNum < constants.MAX_ROW_NUM - 1) {

                if(this.getColorAtBoardPosition(rowNum + 1, columnChar) === oppositeColor) {
                    for(let row = rowNum + 2; row < 9; ++row) {
                        // empty string returned indicates no pieces in the board position
                        if(this.getColorAtBoardPosition(row, columnChar) === '') {
                            positionsFound.add(columnChar + row.toString());
                            break;
                        }
                        // if we end up finding the same color again before finding an empty
                        // board position then exit the loop
                        if(this.getColorAtBoardPosition(row, columnChar) === forWhichColorPlayer) {
                            break;
                        }
                    }
                }

                if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
                    // go ahead and search down and left diagonally
                    if(this.getColorAtBoardPosition(rowNum + 1, this.subtractColumnChar(columnChar)) === oppositeColor) {
                        let curColumnChar:string = this.subtractColumnChar(columnChar);
                        for(let row = rowNum + 2; row < 9 && curColumnChar !== ''; ++row) {
                            curColumnChar = this.subtractColumnChar(curColumnChar);
                            if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                                positionsFound.add(curColumnChar + row.toString());
                                break;
                            }
                            // if we end up finding the same color again before finding an empty
                            // board position then exit the loop
                            if(this.getColorAtBoardPosition(row, curColumnChar) === forWhichColorPlayer) {
                                break;
                            }
                        }
                    }
                }

                if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                    // go ahead and search down and right diagonally 
                    if(this.getColorAtBoardPosition(rowNum + 1, this.addColumnChar(columnChar)) === oppositeColor) {
                        let curColumnChar:string = this.addColumnChar(columnChar);
                        for(let row = rowNum + 2; row < 9 && curColumnChar !== ''; ++row) {
                            curColumnChar = this.addColumnChar(curColumnChar);
                            if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                                positionsFound.add(curColumnChar + row.toString());
                                break;
                            }
                            // if we end up finding the same color again before finding an empty
                            // board position then exit the loop
                            if(this.getColorAtBoardPosition(row, curColumnChar) === forWhichColorPlayer) {
                                break;
                            }
                        }
                    }
                }
            }

            // search to the left in the current row if the piece is
            // on column c or greater because a piece on column
            // B or column A doesn't have enough room to play to the left of it.
            if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {

                if(this.getColorAtBoardPosition(rowNum, this.subtractColumnChar(columnChar)) === oppositeColor) {
                    // start searching to the left until you find an empty board position
                    for(let curColumnChar = this.subtractColumnChar(this.subtractColumnChar(columnChar)); curColumnChar !== ''; curColumnChar = this.subtractColumnChar(curColumnChar)) {
                        // empty string returned indicates no piece in the board position
                        if(this.getColorAtBoardPosition(rowNum, curColumnChar) === '') {
                            positionsFound.add(curColumnChar + rowNum.toString());
                            break;
                        }
                        // if we end up finding the same color again before finding an empty
                        // board position then exit the loop
                        if(this.getColorAtBoardPosition(rowNum, curColumnChar) === forWhichColorPlayer) {
                            break;
                        }
                    }
                }
            }

            // search to the right in the current row if the piece
            // is on columns a through f because a move played on column
            // G or column H doesn't have enough room to play to the right of it.
            if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                if(this.getColorAtBoardPosition(rowNum, this.addColumnChar(columnChar)) === oppositeColor) {
                    // start searching to the right until you find an empty board position
                    for(let curColumnChar = this.addColumnChar(this.addColumnChar(columnChar)); curColumnChar !== ''; curColumnChar = this.addColumnChar(curColumnChar)) {
                        // empty string returned indicates no piece in the board position
                        if(this.getColorAtBoardPosition(rowNum, curColumnChar) === '') {
                            positionsFound.add(curColumnChar + rowNum.toString());
                            break;
                        }
                        // if we end up finding the same color again before finding an empty
                        // board position then exit the loop
                        if(this.getColorAtBoardPosition(rowNum, curColumnChar) === forWhichColorPlayer) {
                            break;
                        }
                    }
                }
            }
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
        if(rowNum > constants.MIN_ROW_NUM + 1) {
            // If there is a piece above the one played and it's the opposite color...
            if(this.getColorAtBoardPosition(rowNum - 1, columnChar) === oppositeColorOfPiecePlayed) {
                // add it to potential flips and...
                potentialFlips.push(columnChar + (rowNum - 1).toString());
                // then start a loop that keeps going up the current column and...
                for(let row = rowNum - 2; row > 0; --row) {
                    // as long as the board position contains the opposite color...
                    if(this.getColorAtBoardPosition(row, columnChar) === oppositeColorOfPiecePlayed) {
                        // add that board position to potential flips.
                        potentialFlips.push(columnChar + row.toString());
                        continue;
                    }
                    // If we encounter a board position in the current column that matches the color of
                    // the piece played, we know we need to add all the pieces we've been tracking in
                    // the potential flips to 'positionsToFlip' array, clear out the potential flips array,
                    // and exit the for loop we're in.
                    if(this.getColorAtBoardPosition(row, columnChar) === colorOfPiecePlayed) {
                        positionsToFlip.push(...potentialFlips);
                        potentialFlips = [];
                        break;
                    }
                    // If there was a piece above the one played that was opposite color, but then we encountered an empty position
                    // clear potential flips and exit the for loop we're in
                    if(this.getColorAtBoardPosition(row, columnChar) === '') {
                        potentialFlips = [];
                        break;
                    }
                }
                // clear potentialFlips once outside of the for loop in case some potential positions were added
                // but never ended up getting added to the positionsToFlip array before the for loop exited
                potentialFlips = [];
            }

            if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
                // go ahead and search up and left diagonally if we are at least as far right as the 'c' column
                if(this.getColorAtBoardPosition(rowNum - 1, this.subtractColumnChar(columnChar)) === oppositeColorOfPiecePlayed) {
                    // add it to potential flips and...
                    potentialFlips.push(this.subtractColumnChar(columnChar) + (rowNum - 1).toString());
                    let curColumnChar:string = this.subtractColumnChar(columnChar);
                    for(let row = rowNum - 2; row > 0 && curColumnChar !== ''; --row) {
                        curColumnChar = this.subtractColumnChar(curColumnChar);
                        if(this.getColorAtBoardPosition(row, curColumnChar) === oppositeColorOfPiecePlayed) {
                            potentialFlips.push(curColumnChar + row.toString());
                            continue;
                        }
                        if(this.getColorAtBoardPosition(row, curColumnChar) === colorOfPiecePlayed) {
                            positionsToFlip.push(...potentialFlips);
                            potentialFlips = [];
                            break;
                        }
                        // If there was a piece above and to the left of the one played that was opposite color, but 
                        // then we encountered an empty position, just clear potential flips and exit the for loop we're in
                        if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                            potentialFlips = [];
                            break;
                        }
                    }
                    // clear potentialFlips once outside of the for loop in case some potential positions were added
                    // but never ended up getting added to the positionsToFlip array before the for loop exited
                    potentialFlips = [];
                }
            }

            if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                // go ahead and search up and right diagonally if we are at least as far left as the 'f' column
                if(this.getColorAtBoardPosition(rowNum - 1, this.addColumnChar(columnChar)) === oppositeColorOfPiecePlayed) {
                    // add it to potential flips and...
                    potentialFlips.push(this.addColumnChar(columnChar) + (rowNum - 1).toString());
                    let curColumnChar:string = this.addColumnChar(columnChar);
                    for(let row = rowNum - 2; row > 0 && curColumnChar !== ''; --row) {
                        curColumnChar = this.addColumnChar(curColumnChar);
                        if(this.getColorAtBoardPosition(row, curColumnChar) === oppositeColorOfPiecePlayed) {
                            potentialFlips.push(curColumnChar + row.toString());
                            continue;
                        }
                        if(this.getColorAtBoardPosition(row, curColumnChar) === colorOfPiecePlayed) {
                            positionsToFlip.push(...potentialFlips);
                            potentialFlips = [];
                            break;
                        }
                        // If there was a piece above and to the right of the one played that was opposite color, but 
                        // then we encountered an empty position, just clear potential flips and exit the for loop we're in
                        if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                            potentialFlips = [];
                            break;
                        }
                    }
                    // clear potentialFlips once outside of the for loop in case some potential positions were added
                    // but never ended up getting added to the positionsToFlip array before the for loop exited
                    potentialFlips = [];
                }
            }
        }

        // search down in the current column if the move played was
        // on row 1 through 6 because a move played on row 7 can't 
        // flip any pieces below it. Also only search down to the left
        // or down to the right if this condition is met.
        if(rowNum < constants.MAX_ROW_NUM - 1) {
            // If there is a piece below the one played and it's the opposite color...
            if(this.getColorAtBoardPosition(rowNum + 1, columnChar) === oppositeColorOfPiecePlayed) {
                // add it to potential flips and...
                potentialFlips.push(columnChar + (rowNum + 1).toString());
                // then start a loop that keeps going down the current column and...
                for(let row = rowNum + 2; row < 9; ++row) {
                    // as long as the board position contains the opposite color...
                    if(this.getColorAtBoardPosition(row, columnChar) === oppositeColorOfPiecePlayed) {
                        // add that board position to potential flips
                        potentialFlips.push(columnChar + row.toString());
                        continue;
                    }
                    // If we encounter a board position in the current column that matches the color of
                    // the piece played, we know we need to add all the pieces we've been tracking in
                    // the potential flips to 'positionsToFlip' array, clear out the potential flips array,
                    // and exit the for loop we're in.
                    if(this.getColorAtBoardPosition(row, columnChar) === colorOfPiecePlayed) {
                        positionsToFlip.push(...potentialFlips);
                        potentialFlips = [];
                        break;
                    }
                    // If there was a piece below the one played that was opposite color, but 
                    // then we encountered an empty position, just clear potential flips and exit the for loop we're in
                    if(this.getColorAtBoardPosition(row, columnChar) === '') {
                        potentialFlips = [];
                        break;
                    }
                }
                // clear potentialFlips once outside of the for loop in case some potential positions were added
                // but never ended up getting added to the positionsToFlip array before the for loop exited
                potentialFlips = [];
                
            }
            

            if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
                // go ahead and search down and left diagonally
                if(this.getColorAtBoardPosition(rowNum + 1, this.subtractColumnChar(columnChar)) === oppositeColorOfPiecePlayed) {
                    // add it to potential flips
                    potentialFlips.push(this.subtractColumnChar(columnChar) + (rowNum + 1).toString());
                    let curColumnChar:string = this.subtractColumnChar(columnChar);
                    for(let row = rowNum + 2; row < 9 && curColumnChar !== ''; ++row) {
                        curColumnChar = this.subtractColumnChar(curColumnChar);
                        if(this.getColorAtBoardPosition(row, curColumnChar) === oppositeColorOfPiecePlayed) {
                            potentialFlips.push(curColumnChar + row.toString());
                            continue;
                        }
                        if(this.getColorAtBoardPosition(row, curColumnChar) === colorOfPiecePlayed) {
                            positionsToFlip.push(...potentialFlips);
                            potentialFlips = [];
                            break;
                        }
                        // If there was a piece below and to the left of the one played that was opposite color, but 
                        // then we encountered an empty position in the next diagonol position, just clear potential flips and exit the for loop we're in
                        if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                            potentialFlips = [];
                            break;
                        }
                    }
                    // clear potentialFlips once outside of the for loop in case some potential positions were added
                    // but never ended up getting added to the positionsToFlip array before the for loop exited
                    potentialFlips = [];
                }
            }

            if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
                // go ahead and search down and right diagonally 
                if(this.getColorAtBoardPosition(rowNum + 1, this.addColumnChar(columnChar)) === oppositeColorOfPiecePlayed) {
                    // add it to potential flips
                    potentialFlips.push(this.addColumnChar(columnChar) + (rowNum + 1).toString());
                    let curColumnChar:string = this.addColumnChar(columnChar);
                    for(let row = rowNum + 2; row < 9 && curColumnChar !== ''; ++row) {
                        curColumnChar = this.addColumnChar(curColumnChar);
                        if(this.getColorAtBoardPosition(row, curColumnChar) === oppositeColorOfPiecePlayed) {
                            potentialFlips.push(curColumnChar + row.toString());
                            continue;
                        }
                        if(this.getColorAtBoardPosition(row, curColumnChar) === colorOfPiecePlayed) {
                            positionsToFlip.push(...potentialFlips);
                            potentialFlips = [];
                            break;
                        }
                        // If there was a piece below and to the right of the one played that was opposite color, but 
                        // then we encountered an empty position in the next diagonol position, just clear potential flips and exit the for loop we're in
                        if(this.getColorAtBoardPosition(row, curColumnChar) === '') {
                            potentialFlips = [];
                            break;
                        }
                    }
                    // clear potentialFlips once outside of the for loop in case some potential positions were added
                    // but never ended up getting added to the positionsToFlip array before the for loop exited
                    potentialFlips = [];
                }
            }
        }

        // search to the left in the current row if the move played
        // was on column c or greater because a move played on column
        // B can't flip any pieces to the left of it.
        if(columnCharAsNum > constants.MIN_COLUMN_CHAR_AS_NUM + 1) {
            if(this.getColorAtBoardPosition(rowNum, this.subtractColumnChar(columnChar)) === oppositeColorOfPiecePlayed) {
                // add it to potential flips
                potentialFlips.push(this.subtractColumnChar(columnChar) + rowNum.toString());
                // start searching to the left until you find the same color as the piece played (or run out of places)
                for(let curColumnChar = this.subtractColumnChar(this.subtractColumnChar(columnChar)); curColumnChar !== ''; curColumnChar = this.subtractColumnChar(curColumnChar)) {
                    if(this.getColorAtBoardPosition(rowNum, curColumnChar) === oppositeColorOfPiecePlayed) {
                        potentialFlips.push(curColumnChar + rowNum.toString());
                        continue;
                    }
                    if(this.getColorAtBoardPosition(rowNum, curColumnChar) === colorOfPiecePlayed) {
                        positionsToFlip.push(...potentialFlips);
                        potentialFlips = [];
                        break;
                    }
                    // If there was a piece to the left of the one played that was opposite color, but 
                    // then we encountered an empty position in the next left position, just clear potential flips and exit the for loop we're in
                    if(this.getColorAtBoardPosition(rowNum, curColumnChar) === '') {
                        potentialFlips = [];
                        break;
                    }
                }
                // clear potentialFlips once outside of the for loop in case some potential positions were added
                // but never ended up getting added to the positionsToFlip array before the for loop exited
                potentialFlips = [];
            }
        }

        // search to the right in the current row if the move played
        // was on column f or lesser because a move played on column
        // G can't flip any pieces to the right of it.
        if(columnCharAsNum < constants.MAX_COLUMN_CHAR_AS_NUM - 1) {
            if(this.getColorAtBoardPosition(rowNum, this.addColumnChar(columnChar)) === oppositeColorOfPiecePlayed) {
                // add it to potential flips
                potentialFlips.push(this.addColumnChar(columnChar) + rowNum.toString());
                // start searching to the right until you find the same color as the piece played (or run out of places)
                for(let curColumnChar = this.addColumnChar(this.addColumnChar(columnChar)); curColumnChar !== ''; curColumnChar = this.addColumnChar(curColumnChar)) {
                    if(this.getColorAtBoardPosition(rowNum, curColumnChar) === oppositeColorOfPiecePlayed) {
                        potentialFlips.push(curColumnChar + rowNum.toString());
                        continue;
                    }
                    if(this.getColorAtBoardPosition(rowNum, curColumnChar) === colorOfPiecePlayed) {
                        positionsToFlip.push(...potentialFlips);
                        potentialFlips = [];
                        break;
                    }
                    // If there was a piece to the right of the one played that was opposite color, but 
                    // then we encountered an empty position in the next left position, just clear potential flips and exit the for loop we're in
                    if(this.getColorAtBoardPosition(rowNum, curColumnChar) === '') {
                        potentialFlips = [];
                        break;
                    }
                }
                // clear potentialFlips once outside of the for loop in case some potential positions were added
                // but never ended up getting added to the positionsToFlip array before the for loop exited
                potentialFlips = [];
            }
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
    static getColorAtBoardPosition = (rowNum:number, columnChar:string):string | null => {
        const boardElement = document.getElementById(columnChar + rowNum.toString());
        if(boardElement?.classList.contains(constants.CSS_CLASS_NAME_BLACK)) return constants.CSS_CLASS_NAME_BLACK;
        if(boardElement?.classList.contains(constants.CSS_CLASS_NAME_WHITE)) return constants.CSS_CLASS_NAME_WHITE;
        if(rowNum === 9 || columnChar === 'i') return null;
        return '';
    }

    /**
     * @remarks
     * Gets the state of the board in an array
     * @returns a two dimensional array containing values that depict the current state of the board
     */
    static getBoardStateAsArray = (): number[][] => {

        const boardStateArray:number[][] = [];
        for(let i = 0; i < 8; i++) {
            boardStateArray.push([]);
            for(let j = i; j < 8; j++) {
                boardStateArray[i].push(j);
            }
        }

        // get a reference to the board
        const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);

        // get all child <div> elements and look at their class names to determine 
        // current state of the board
        const boardElements: NodeListOf<Element> = 
            board?.querySelectorAll('div') as NodeListOf<Element>;

        for(let element of boardElements) {
            if(element.classList.length === 0) {

            } else {

            }
        }

        return boardStateArray;
    }
}