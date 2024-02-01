import * as constants from "./constants.js";
/**
 * @remarks
 * This class contains methods that are commonly relied upon
 * across multiple classes so they're being grouped together
 * in one place here under the name "Utils"
 */
export class OthelloUtils {
    constructor() { }
}
OthelloUtils.boardPositionsByClassNames = (classNames) => {
    const board = document.getElementById(constants.CSS_ELEMENT_ID_BOARD);
    // get children that have the class name applied to them
    const querySelector = classNames.startsWith('.') ? classNames : '.' + classNames;
    const boardElements = board?.querySelectorAll(querySelector);
    return boardElements;
};
OthelloUtils.consoleLog = (message) => {
    if (constants.LOGGING_ENABLED)
        console.log(message);
};
//# sourceMappingURL=OthellUtils.js.map