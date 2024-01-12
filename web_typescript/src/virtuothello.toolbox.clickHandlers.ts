import { newGameType, newGame, startNewGame } from "./virtuothello.tools.js" 

const newGameHumanVsHumanClickHandler = (event:MouseEvent):void => {
    const game:newGame = {
        type: newGameType.humanVsHuman
    };
    startNewGame(game);
}

const hvhButton = document.getElementById('btnNewGameHumanVsHuman');
hvhButton?.addEventListener('click', newGameHumanVsHumanClickHandler);