import PlayerInterface from "./model.player";

class Player implements PlayerInterface{
    name: String;
    symbol: String;
    
    constructor(name: String, symbol: String){
        this.name = name;
        this.symbol = symbol;
    }
}

export default Player;