import { newGameType, startNewGame } from "./virtuothello.tools";
const newGameHumanVsHumanClickHandler = (event) => {
    const game = {
        type: newGameType.humanVsHuman
    };
    startNewGame(game);
};
const hvhButton = document.getElementById('btnNewGameHumanVsHuman');
hvhButton === null || hvhButton === void 0 ? void 0 : hvhButton.addEventListener('click', newGameHumanVsHumanClickHandler);
