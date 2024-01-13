"use strict";
System.register("virtuothello.tools", [], function (exports_1, context_1) {
    "use strict";
    var newGameType, startNewGame, newHVHGame, newYABGame, newYAWGame, newSPLGame;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (newGameType) {
                newGameType["humanVsHuman"] = "HVH";
                newGameType["youAsBlack"] = "YAB";
                newGameType["youAsWhite"] = "YAW";
                newGameType["selfplay"] = "SPL";
            })(newGameType || (exports_1("newGameType", newGameType = {})));
            ;
            exports_1("startNewGame", startNewGame = (gameTypeChoice) => {
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
            });
            newHVHGame = () => {
                console.log('new Game Human vs Human');
            };
            newYABGame = () => {
                console.log('new Game You as Black');
            };
            newYAWGame = () => {
                console.log('new Game You as White');
            };
            newSPLGame = () => {
                console.log('new Game Selfplay');
            };
        }
    };
});
System.register("virtuothello.toolbox.clickHandlers", ["virtuothello.tools"], function (exports_2, context_2) {
    "use strict";
    var virtuothello_tools_js_1, newGameHumanVsHumanClickHandler, hvhButton;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (virtuothello_tools_js_1_1) {
                virtuothello_tools_js_1 = virtuothello_tools_js_1_1;
            }
        ],
        execute: function () {
            newGameHumanVsHumanClickHandler = (event) => {
                const game = {
                    type: virtuothello_tools_js_1.newGameType.humanVsHuman
                };
                virtuothello_tools_js_1.startNewGame(game);
            };
            hvhButton = document.getElementById('btnNewGameHumanVsHuman');
            hvhButton === null || hvhButton === void 0 ? void 0 : hvhButton.addEventListener('click', newGameHumanVsHumanClickHandler);
        }
    };
});
