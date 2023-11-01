import IllegalMoveError from "./Game/Errors/IllegalMoveError";
import boxRewardOneMove from "./Game/Strategies/boxRewardOneMove";
import MaxBoxWin from "./Game/Strategies/winStrategyMaxBox";
import GameController from "./Game/controllers/game.controller";
import GameResources from "./Game/producer";
import { GameBuilder, GameState } from "./Game/services/game.service";
import Player from "./Player/service.player";
const prompt = require('prompt-sync')({sigint: true});
// import chalk from "chalk";
try {
    console.log("Welcome to a new game");
    console.log("Press enter to begin");

    let e = null;   // input error variable


    let sizeOfBoard;
    let numberOfPlayers;

    e="test";
    while(e!=null){
        // console.log(e);
        try {
            ({sizeOfBoard, numberOfPlayers, e} = setGameParams(sizeOfBoard, numberOfPlayers, e));
        } catch (error) {
            console.log(error)
            e=error;
        }
        // console.error(chalk.red(e));
        
    }
    
    // let sizeOfBoard = 5;

    // // console.log(`Number of players = ${sizeOfBoard}`);

    
    // let numberOfPlayers = 2
    // console.log(`Number of players = ${numberOfPlayers}`);

    const gameBuilder = new GameBuilder();
    gameBuilder.setBoxDimension(sizeOfBoard!);

    let playerList = [];
    // playerList.push(new Player("Vivek", "v"))
    // playerList.push(new Player("Avi", "a"))

    let i=0;
    e=null;

    //ADD PLAYERS
    while(!(i>=numberOfPlayers! && !e)){
        try {
            const p: string = prompt('Enter the name of player '+(i+1));
            // console.log(`Number of players = ${numberOfPlayers}`);
            const s: string = prompt('Enter the symbol of player '+(i+1) + " => "+p+" . Use a single character please.");
            const player = new Player(p, s);
            playerList.push(player);
            e = null;
            i++;
        } catch (error) {
            // console.error(chalk.red(error));
            console.error(error)
            e = error;
            continue;
        }
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

    // GAME TEST VARS;
    let testPoint1 = 0;
    let testPoint2 = 0;
    let moveSideA;
    let moveSideB;
    let d1: string|null, d2: string|null;

    let autoMove = true;

    // START GAME
    gameController.setGameState(GameState.IN_PROGRESS);
    while(game.gameState===GameState.IN_PROGRESS || game.gameState===GameState.NOT_STARTED){
        let boxCreated = false;
        try {
            gameController.displayBoard();
            let thisPlayer = playerList[game.playerMoveOrder![i%playerList.length]];
            if(!autoMove){
                d1 = prompt(thisPlayer.name+"'s move. Please enter the dot number of first dot to draw a line from");
                d2 = prompt("Enter the dot number of second dot to draw a line to. Choose adjacent dot only");
            }else{
                const s = prompt("press space for next move");
                ({d1, d2, testPoint1, testPoint2, moveSideA, moveSideB} = testGame(testPoint1, testPoint2, sizeOfBoard!, moveSideA, moveSideB));
                if(!d1 || !d2){
                    autoMove = false;
                    console.warn("NOW MANUALLY ENTER THE VALUES");
                    continue;
                }
            }
            i = gameController.move(d1!, d2!, thisPlayer, i);
        } catch (error) {
            // console.error(chalk.red(error));
            console.error(error);
            continue;
        }
    }

    console.log("***********CONGRATULATIONS***********");
    console.log(game.winner?.name + " has won the GAME; Time for celebrations")
} catch (error) {
    console.error(error)
}

function testGame(startA: number, startB: number, boxDimension: number, moveSideA: number=0, moveSideB: number=1){
    let d1 = startA + ""+startB;
    // let moveSideA = 0;
    // let moveSideB = 1;
    if(d1=="0"+boxDimension){   // 04
        moveSideA = 1;
        moveSideB = 0;
    }else if(d1==boxDimension+""+boxDimension){ // 44
        moveSideA = 0;
        moveSideB = -1;
    }else if(d1==boxDimension+"0"){ // 40
        moveSideA = -1;
        moveSideB = 0;
    }

    if(d1=="1"+(boxDimension-1)){   // 13
        moveSideA = 0;
        moveSideB = -1;
    }else if(d1==(boxDimension-1)+""+(boxDimension-1)){ // 33
        moveSideA = -1;
        moveSideB = 0;
    }else if(d1==(boxDimension-1)+"0"){ // 30
        moveSideA = 0;
        moveSideB = 1;
    }
    let d2 = (startA+moveSideA) +"" + (startB+moveSideB);

    console.log(d1+ "-->" + d2);
    if(d1=="10"){
        return {d1: null, d2: null, testPoint1: 1, testPoint2: 0, moveSideA, moveSideB}
    }
    // let d2 = startA<boxDimension? 
    //                 startB<boxDimension?
    //                     startA+""+(startB+moveSide)
    //                     : (startA+moveSide) + ""+startB
    //                 :
    return {d1, d2, testPoint1: startA+moveSideA, testPoint2: startB+moveSideB, moveSideA, moveSideB};
}

function setGameParams(sizeOfBoard?: number, numberOfPlayers?: number, e?: any){
    // try {
        sizeOfBoard = prompt('How many rows-columns of boxes do you want in the game? ');
        sizeOfBoard = Number(sizeOfBoard)
        numberOfPlayers = prompt('How many players will play the game. Enter a number between 2 and 5?');
        numberOfPlayers = Number(numberOfPlayers);
        if(sizeOfBoard<2){
            throw new Error('Size of board too small')
        }
        if(!isNaN(numberOfPlayers) && !isFinite(numberOfPlayers)){
            e="Please enter a valid numeric value for number of players";
            throw new Error(e)
        }
        if(numberOfPlayers<2 || numberOfPlayers>5){
            e="Please enter a value between 2 and 5 for the number of players"
            throw new Error(e)
        }
        e=null;
        return {e, sizeOfBoard, numberOfPlayers}
    // } catch (error) {
    //     console.log(error)
    //     e=error;
    // }
}