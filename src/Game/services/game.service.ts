import BoxCreationRewardStrategy from "../Strategies/BoxCreationReward";
import winningStrategy from "../Strategies/WinStrategy";
import boxRewardOneMove from "../Strategies/boxRewardOneMove";
import MaxBoxWin from "../Strategies/winStrategyMaxBox";
import { Board, Line, Player } from "../consumer";

enum GameState{
    NOT_STARTED, IN_PROGRESS, END_IN_TIE, END_IN_WIN
}

class Game{
    private _board?: Board;
    private _players?: Array<Player>;
    private _moves?: Array<Line> = [];
    private _winner?: Player;
    private _playerMoveOrder?: Array<number>;
    private _round?: number;
    private _gameState?: GameState;
    private _winningStrategy: winningStrategy;
    private _boxCreationRewardStrategy: BoxCreationRewardStrategy;
    // private _legalMoveStrategy: LegalMoveStrategy;

    // private constructor(gb: GameBuilder){
    //     this._board = gb.board;
    //     this._players = gb.players;
    //     this._playerMoveOrder = gb.playerMoveOrder;
    //     this._move = gb.move;
    //     this._winner = gb.winner;
    //     this._round = gb.round;
    //     this._gameState = gb.gameState;
    // }
    constructor(){
        this._boxCreationRewardStrategy = new boxRewardOneMove();
        this._winningStrategy = new MaxBoxWin();
    }

    public get board(): Board | undefined {
        return this._board;
    }
    public set board(value: Board) {
        this._board = value;
    }

    public get players(): Array<Player> | undefined {
        return this._players;
    }
    public set players(value: Array<Player>) {
        this._players = value;
    }

    public get winningStrategy(): winningStrategy {
        return this._winningStrategy;
    }
    public set winningStrategy(winStrategy: winningStrategy) {
        this._winningStrategy = winStrategy;
    }

    public get boxCreationRewardStrategy(): BoxCreationRewardStrategy {
        return this._boxCreationRewardStrategy;
    }
    public set boxCreationRewardStrategy(boxRewardStrategy: BoxCreationRewardStrategy) {
        this._boxCreationRewardStrategy = boxRewardStrategy;
    }

    public get moves(): Array<Line> | undefined {
        return this._moves;
    }
    public set moves(arr: Array<Line>) {
        this._moves = arr;
    }
    public addMove(value: Line) {
        this._moves? this._moves.push(value) : this._moves = [value];
    }

    public get winner(): Player | undefined {
        return this._winner;
    }
    public set winner(value: Player | undefined) {
        this._winner = value;
    }

    public get playerMoveOrder(): Array<number> | undefined {
        return this._playerMoveOrder;
    }
    public set playerMoveOrder(value: Array<number>) {
        this._playerMoveOrder = value;
    }

    public get round(): number | undefined {
        return this._round;
    }
    public set round(value: number) {
        this._round = value;
    }

    public get gameState(): GameState | undefined {
        return this._gameState;
    }
    public set gameState(value: GameState) {
        this._gameState = value;
    }

    public boxCreationReward(playersMove: number, numOfBoxes: number): number{
        return this._boxCreationRewardStrategy.boxCreationReward(playersMove, numOfBoxes);
    }

    public checkWin(): Player | null{
        let player = this._winningStrategy.checkWin(this);
        if(player){
            this.gameState = GameState.END_IN_WIN;
            this.winner = player;
        }
        return player;
    }

}

class GameBuilder{
    // board: Board
    // players: Array<Player>
    // move: Line
    // winner: Player | undefined
    // playerMoveOrder: Array<number>
    // round: number
    // gameState: GameState
    private game: Game;
    private boxDimension: number;
    private players: Array<Player>;
    private winningStrategy?: winningStrategy;
    private boxCreationRewardStrategy?: BoxCreationRewardStrategy;

    constructor(){
        this.game = new Game();
        this.boxDimension = 0;
        this.players = [];
        console.log(this.generateRandomMoveOrder())
    }

    public setBoxDimension(N: number): GameBuilder{
        this.boxDimension = N;
        return this;
    }

    public setPlayers(players: Array<Player>): GameBuilder{
        this.players = players;
        return this;
    }

    public setWinningStrategy(Strategy: winningStrategy): GameBuilder{
        this.winningStrategy = Strategy;
        return this;
    }

    public setBoxCreationRewardStrategy(Strategy: BoxCreationRewardStrategy): GameBuilder{
        this.boxCreationRewardStrategy = Strategy;
        return this;
    }

    private validate(){
        // some validation code
    }

    private generateRandomMoveOrder(): Array<number>{
        let arr = new Array(this.players.length).fill(0).map((a, i)=>{return i});
        let moveOrder = new Array(this.players.length);

        for(let i=0; i<this.players.length; i++){
            let r = Math.floor(Math.random()*arr.length);
            moveOrder[i] = arr.splice(r,1)[0];
        }

        return moveOrder;
    }

    public build(): Game{
        this.validate();
        let playerMoveOrder = this.generateRandomMoveOrder();
        const g = new Game();
        this.game = g;
        const board = new Board(this.boxDimension);
        this.game.board = board;
        this.game.players = this.players;
        this.game.gameState = GameState.NOT_STARTED;
        this.game.moves = [];
        this.game.playerMoveOrder = playerMoveOrder;
        this.game.round = 0;
        this.game.winner = undefined;
        this.game.winningStrategy = this.winningStrategy ? this.winningStrategy : this.game.winningStrategy;
        this.game.boxCreationRewardStrategy = this.boxCreationRewardStrategy? this.boxCreationRewardStrategy : this.game.boxCreationRewardStrategy;

        return this.game;
    }

}

export {GameBuilder, Game, GameState};

// let generateRandomMoveOrder2= function(){
//     let arr = new Array(6).fill(0).map((a, i)=>{return i});
//     let moveOrder = new Array(6);

//     for(let i=0; i<6; i++){
//         let r = Math.floor(Math.random()*arr.length);
//         moveOrder[i] = arr.splice(r, 1)[0];
//     }

//     return moveOrder;
// }
// function addMove(value, moves) {
//     moves? moves.push(value) : moves = [value];
//     console.log(moves)
// }