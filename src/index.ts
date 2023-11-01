import IllegalMoveError from "./Game/Errors/IllegalMoveError";
import boxRewardOneMove from "./Game/Strategies/boxRewardOneMove";
import MaxBoxWin from "./Game/Strategies/winStrategyMaxBox";
import GameController from "./Game/controllers/game.controller";
import GameResources from "./Game/producer";
import { GameBuilder, GameState } from "./Game/services/game.service";
import Player from "./Player/service.player";
const prompt = require('prompt-sync')({sigint: true});
const chalk = require("chalk");
try {
    console.log("Welcome to a new game");
    console.log("Press enter to begin");

    let e = null;   // input error variable


    let sizeOfBoard;
    let numberOfPlayers;

    while(e){
        try {
            sizeOfBoard = prompt('How many rows-columns of boxes do you want in the game? ');
            numberOfPlayers = prompt('How many players will play the game. Enter a number between 2 and 5?');
            if(!isNaN(numberOfPlayers) && !isFinite(numberOfPlayers)){
                e="Please enter a valid numeric value for number of players";
            }
            if(numberOfPlayers<2 || numberOfPlayers>5){
                e="Please enter a value between 2 and 5 for the number of players"
            }
            e=null;
        } catch (error) {
            e=error;
        }
        console.error(chalk.red(e));
    }
    
    // let sizeOfBoard = 5;

    // // console.log(`Number of players = ${sizeOfBoard}`);

    
    // let numberOfPlayers = 2
    // console.log(`Number of players = ${numberOfPlayers}`);

    const gameBuilder = new GameBuilder();
    gameBuilder.setBoxDimension(sizeOfBoard);

    let playerList = [];
    // playerList.push(new Player("Vivek", "v"))
    // playerList.push(new Player("Avi", "a"))

    let i=0;
    e=null;

    //ADD PLAYERS
    while(e || i<numberOfPlayers){
        try {
            const p: string = prompt('Enter the name of player '+(i+1));
            // console.log(`Number of players = ${numberOfPlayers}`);
            const s: string = prompt('Enter the symbol of player '+(i+1) + " => "+p+" . Use a single character please.");
            const player = new Player(p, s);
            playerList.push(player);
            e = null;
        } catch (error) {
            console.error(chalk.red(error));
            e = error;
            continue;
        }
        i++;
    }
    console.log(playerList);
    const game = gameBuilder.setPlayers(playerList).build();

    // can allow user input to define
    gameBuilder.setBoxCreationRewardStrategy(new boxRewardOneMove());
    gameBuilder.setWinningStrategy(new MaxBoxWin());

    const board = game.board!;

    const gameController = new GameController(game);
    i=0;
    e=null;

    // START GAME
    gameController.setGameState(GameState.IN_PROGRESS);
    while(game.gameState===GameState.IN_PROGRESS || game.gameState===GameState.NOT_STARTED){
        let boxCreated = false;
        try {
            gameController.displayBoard();
            let thisPlayer = playerList[game.playerMoveOrder![i%playerList.length]];
            const d1: string = prompt(thisPlayer.name+"'s move. Please enter the dot number of first dot to draw a line from");
            const d2: string = prompt("Enter the dot number of second dot to draw a line to. Choose adjacent dot only");
            i = gameController.move(d1, d2, thisPlayer, i);
        } catch (error) {
            console.error(chalk.red(error));
            continue;
        }
        // boxCreated ? null : i++;
    }
} catch (error) {
    console.error(error)
}

