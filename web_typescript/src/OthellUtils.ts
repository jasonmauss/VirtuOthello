import * as constants from "./constants.js"

/**
 * @remarks
 * This class contains methods that are commonly relied upon
 * across multiple classes so they're being grouped together
 * in one place here under the name "Utils"
 */
export class OthelloUtils {
    
    constructor() {}

    /**
     * @remarks
     * Allows for retrieval of board position elements (the 64 divs) that
     * have a particular class applied to them.
     * @param classNames one or more class names, separated by commas, beginning with a dot
     * @returns a NodeListOf<Element> collection
     */
    static boardPositionsByClassNames = (classNames:string): NodeListOf<Element> => {

        const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
        // get children that have the class name applied to them
        const querySelector:string = classNames.startsWith('.') ? classNames : '.' + classNames;

        const boardElements: NodeListOf<Element> = 
            board?.querySelectorAll(querySelector) as NodeListOf<Element>;

        return boardElements;
    }

    /**
     * @remarks
     * passes along a message or HTML element to the browser console
     * @param message The message or HTML element to output to the console
     */
    static consoleLog = (message:string|HTMLElement):void => {
        if(constants.LOGGING_ENABLED)
            console.log(message);
    }

    /**
     * @remarks
     * This method exists just to make getting the opposite color syntactically easier
     * than having this lengthy ternary statement all over the rest of the codebase.
     * @param color The color you want the opposite of
     * @returns Black if you pass in white, white if you pass in black
     */
    static getOppositeColor = (color:string):string => {
        return color === constants.CSS_CLASS_NAME_BLACK
            ? constants.CSS_CLASS_NAME_WHITE
            : constants.CSS_CLASS_NAME_BLACK;
    }

}