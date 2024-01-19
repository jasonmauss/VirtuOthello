import { newGameType, startNewGame } from "./virtuothello.tools.js";
const newGameHumanVsHumanClickHandler = (event) => {
    const game = {
        type: newGameType.humanVsHuman
    };
    startNewGame(game);
};
const hvhButton = document.getElementById('btnNewGameHumanVsHuman');
hvhButton?.addEventListener('click', newGameHumanVsHumanClickHandler);
