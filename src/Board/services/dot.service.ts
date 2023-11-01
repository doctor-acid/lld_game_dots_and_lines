import DotInterface from "../models/dot.model";
import Line from "./line.service";
import Direction from "../models/direction.model";

class Dot { // implements DotInterface
    private _x: number
    private _y: number
    private topLine?: Line
    private rightLine?: Line
    private bottomLine?: Line
    private leftLine?: Line

    constructor(x:number, y:number){
        this._x = x;
        this._y = y;
    }

    public setX(x: number): void{
        this._x = x;
    }
    public setY(y: number): void{
        this._y = y;
    }
    public getX(): number{
        return this._x;
    }
    public getY(): number{
        return this._y;
    }
    public setLine(line: Line, direction: Direction){
        switch(direction){
            case Direction.TOP : this.topLine = line; break;
            case Direction.BOTTOM : this.bottomLine = line; break;
            case Direction.RIGHT : this.rightLine = line; break;
            case Direction.LEFT : this.leftLine = line; break;
            default: throw new Error('Invalid direction specified')
        }
    }

    public getLine(direction: Direction): Line | undefined{
        switch(direction){
            case Direction.TOP : return this.topLine;
            case Direction.BOTTOM : return this.bottomLine;
            case Direction.RIGHT : return this.rightLine;
            case Direction.LEFT : return this.leftLine;
            default: throw new Error('Invalid direction specified')
        }
    }

    public getAbsDistance(): number{
        return Math.sqrt((this.getX()**2)*(this.getY()**2));
    }
    public static getLesserDot(a:Dot, b:Dot): Dot{
        if(a.getX()===b.getX()){
            return a.getY()>b.getY()? b : a;
        }else if(a.getY()===b.getY()){
            return a.getX()>b.getX()? b : a;
        }else{
            return a.getAbsDistance() > b.getAbsDistance() ? b : a;
        }
    }
    public static getGreaterDot(a:Dot, b:Dot): Dot{
        if(a.getX()===b.getX()){
            return a.getY()>b.getY()? a : b;
        }else if(a.getY()===b.getY()){
            return a.getX()>b.getX()? a : b;
        }else{
            return a.getAbsDistance() > b.getAbsDistance() ? a : b;
        }
    }
}

export default Dot