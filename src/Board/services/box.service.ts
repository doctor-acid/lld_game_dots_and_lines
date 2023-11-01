import { Player } from "../consumer";
import Dot from "./dot.service";
import Line from "./line.service";
import Direction from "../models/direction.model";
class Box{
    // private tl: Dot
    // private tr: Dot
    // private bl: Dot
    // private br: Dot

    private xIndex: number
    private yIndex: number

    private captured: Boolean
    private owner: Player | null

    private left?: Line
    private top?: Line
    private right?: Line
    private bottom?: Line

    
    


    constructor(x:number, y:number){
        this.xIndex = x;
        this.yIndex = y;
        this.captured = false;
        this.owner = null;
    }

    public setXIndex(x: number): void{
        this.xIndex = x;
    }
    public setYIndex(y: number): void{
        this.yIndex = y;
    }
    public getXIndex(): number{
        return this.xIndex;
    }
    public getYIndex(): number{
        return this.yIndex;
    }

    public setCaptured(captured: Boolean): void{
        this.captured = captured;
    }
    public getCaptured(): Boolean{
        return this.captured;
    }

    public setOwner(owner: Player): void{
        this.owner = owner;
    }
    public getOwner(): Player | null{
        return this.owner;
    }

    public setLine(line: Line, direction: Direction){
        switch(direction){
            case Direction.TOP : this.top = line; break;
            case Direction.BOTTOM : this.bottom = line; break;
            case Direction.RIGHT : this.right = line; break;
            case Direction.LEFT : this.left = line; break;
            default: throw new Error('Invalid direction specified')
        }
    }

    public getLine(direction: Direction): Line | undefined{
        switch(direction){
            case Direction.TOP : return this.top;
            case Direction.BOTTOM : return this.bottom;
            case Direction.RIGHT : return this.right;
            case Direction.LEFT : return this.left;
            default: throw new Error('Invalid direction specified')
        }
    }

    public getAbsDistance(): number{
        return Math.sqrt((this.getXIndex()**2)*(this.getYIndex()**2));
    }
    public static getLesserBox(a:Box, b:Box): Box{
        if(a.getXIndex()===b.getXIndex()){
            return a.getYIndex()>b.getYIndex()? b : a;
        }else if(a.getYIndex()===b.getYIndex()){
            return a.getXIndex()>b.getXIndex()? b : a;
        }else{
            return a.getAbsDistance() > b.getAbsDistance() ? b : a;
        }
    }
    public static getGreaterBox(a:Box, b:Box): Box{
        if(a.getXIndex()===b.getXIndex()){
            return a.getYIndex()>b.getYIndex()? a : b;
        }else if(a.getYIndex()===b.getYIndex()){
            return a.getXIndex()>b.getXIndex()? a : b;
        }else{
            return a.getAbsDistance() > b.getAbsDistance() ? a : b;
        }
    }

    // public static getAdjacentBoxesToALine(line: Line): Array<Box|undefined>{
    //     let m = undefined;
    //     let n = undefined;

    // }
}

export default Box