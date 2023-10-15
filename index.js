import Game from "./src/game.js";
import GUI from "./src/gui.js";

const root = document.querySelector('#root');

const game = new Game();
const gui = new GUI(root, 480, 640, 20, 10);
window.gui = gui;
window.game = game;

document.addEventListener('keydown', event => {
    switch(event.key){
        case "ArrowLeft": //LEFT ARROW
            game.movePieceLeft();
            gui.render(game.getGameState());
            break;
        case "ArrowUp": //UP ARROW
            game.turnPiece()
            gui.render(game.getGameState());
            break;
        case "ArrowRight": //RiGHT ARROW
            game.movePieceRight()
            gui.render(game.getGameState());
            break;
        case "ArrowDown":
            game.movePieceDown()
            gui.render(game.getGameState());
            break;
    }
})

gui.render(game.getGameState())