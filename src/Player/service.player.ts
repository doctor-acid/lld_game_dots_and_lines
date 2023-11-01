import PlayerInterface from "./model.player";

class Player implements PlayerInterface{
    name: string;
    symbol: string;
    
    constructor(name: string, symbol: string){
        this.name = name;
        this.symbol = symbol;
    }
}

export default Player;