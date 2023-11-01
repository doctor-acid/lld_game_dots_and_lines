import GameController from "./Game/controllers/game.controller";
import GameResources from "./Game/producer";
import { GameBuilder, GameState } from "./Game/services/game.service";
import Player from "./Player/service.player";
const prompt = require('prompt-sync')({sigint: true});
try {
    console.log("Welcome to a new game");
    console.log("Press enter to begin");

    let sizeOfBoard = prompt('How many rows-columns of boxes do you want in the game?');
    // let sizeOfBoard = 5;

    // // console.log(`Number of players = ${sizeOfBoard}`);

    let numberOfPlayers = prompt('How many players will play the game. Enter a number between 2 and 5?');
    // let numberOfPlayers = 2
    // console.log(`Number of players = ${numberOfPlayers}`);

    const gameBuilder = new GameBuilder();
    gameBuilder.setBoxDimension(sizeOfBoard);

    let playerList = [];
    // playerList.push(new Player("Vivek", "v"))
    // playerList.push(new Player("Avi", "a"))
    for(let i=0; i<numberOfPlayers; i++){
        const p: string = prompt('Enter the name of player '+(i+1));
        // console.log(`Number of players = ${numberOfPlayers}`);
        const s: string = prompt('Enter the symbol of player '+(i+1) + " => "+p+" . Use a single character please.");
        const player = new Player(p, s);
        playerList.push(player);
    }
    console.log(playerList);
    const game = gameBuilder.setPlayers(playerList).build();
    const board = game.board!;

    const gameController = new GameController(game);
    let i=0;
    while(game.gameState===GameState.IN_PROGRESS || game.gameState===GameState.NOT_STARTED){
        console.log(game.playerMoveOrder)
        gameController.displayBoard();
        let thisPlayer = playerList[game.playerMoveOrder![i%playerList.length]];
        const d1: string = prompt(thisPlayer.name+"'s move. Please enter the dot number of first dot to draw a line from");
        const d2: string = prompt("Enter the dot number of second dot to draw a line to. Choose adjacent dot only");
        gameController.move(d1, d2, thisPlayer);
        i++;
    }
} catch (error) {
    console.error(error)
}

