"use strict";
define("virtuothello.tools", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.startNewGame = exports.newGameType = void 0;
    var newGameType;
    (function (newGameType) {
        newGameType["humanVsHuman"] = "HVH";
        newGameType["youAsBlack"] = "YAB";
        newGameType["youAsWhite"] = "YAW";
        newGameType["selfplay"] = "SPL";
    })(newGameType || (exports.newGameType = newGameType = {}));
    ;
    const startNewGame = (gameTypeChoice) => {
        switch (gameTypeChoice.type) {
            case newGameType.humanVsHuman:
                newHVHGame();
            case newGameType.youAsBlack:
                newYABGame();
            case newGameType.youAsWhite:
                newYAWGame();
            case newGameType.selfplay:
                newSPLGame();
            default:
                newHVHGame();
        }
    };
    exports.startNewGame = startNewGame;
    const newHVHGame = () => {
        console.log('new Game Human vs Human');
    };
    const newYABGame = () => {
        console.log('new Game You as Black');
    };
    const newYAWGame = () => {
        console.log('new Game You as White');
    };
    const newSPLGame = () => {
        console.log('new Game Selfplay');
    };
});
define("virtuothello.toolbox.clickHandlers", ["require", "exports", "virtuothello.tools"], function (require, exports, virtuothello_tools_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const newGameHumanVsHumanClickHandler = (event) => {
        const game = {
            type: virtuothello_tools_js_1.newGameType.humanVsHuman
        };
        (0, virtuothello_tools_js_1.startNewGame)(game);
    };
    const hvhButton = document.getElementById('btnNewGameHumanVsHuman');
    hvhButton === null || hvhButton === void 0 ? void 0 : hvhButton.addEventListener('click', newGameHumanVsHumanClickHandler);
});
