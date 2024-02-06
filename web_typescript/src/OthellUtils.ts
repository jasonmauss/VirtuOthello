import * as constants from "./constants.js"

/**
 * @remarks
 * This class contains methods that are commonly relied upon
 * across multiple classes so they're being grouped together
 * in one place here under the name "Utils"
 */
export class OthelloUtils {
    
    constructor() {}

    static boardPositionsByClassNames = (classNames:string): NodeListOf<Element> => {

        const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
        // get children that have the class name applied to them
        const querySelector:string = classNames.startsWith('.') ? classNames : '.' + classNames;

        const boardElements: NodeListOf<Element> = 
            board?.querySelectorAll(querySelector) as NodeListOf<Element>;

        return boardElements;
    }

    static consoleLog = (message:string|HTMLElement):void => {
        if(constants.LOGGING_ENABLED)
            console.log(message);
    }

    static getOppositeColor = (color:string):string => {
        return color === constants.CSS_CLASS_NAME_BLACK
            ? constants.CSS_CLASS_NAME_WHITE
            : constants.CSS_CLASS_NAME_BLACK;
    }

}