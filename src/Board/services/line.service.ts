import { Player } from "../consumer";
// import Box from "./service.box";
import Dot from "./dot.service";

class Line {
    private a: Dot
    private b: Dot

    // private drawn: Boolean
    private player: Player | undefined

    constructor(a: Dot, b: Dot){
        this.a = a;
        this.b = b;
        // this.drawn = false;
        this.player = undefined;
    }

    public setA(a: Dot): void{
        this.a = a;
    }
    public setB(y: Dot): void{
        this.b = y;
    }
    public getA(): Dot{
        return this.a;
    }
    public getB(): Dot{
        return this.b;
    }

    // public setDrawn(drawn: Boolean): void{
    //     this.drawn = drawn;
    // }
    // public getDrawn(): Boolean{
    //     return this.drawn;
    // }

    public setPlayer(player: Player): void{
        this.player = player;
    }
    public getPlayer(): Player | undefined{
        return this.player;
    }
}

export default Line