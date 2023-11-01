import Box from "./box.service"
import Dot from "./dot.service"
import Line from "./line.service"


class Board{
    private boxDimension: number
    // private dotDimension: number
    private boxes: Array<Array<Box>>
    private dots: Array<Array<Dot>>
    readonly dotMap: Map<string, Dot>
    readonly boxMap: Map<string, Box>
    // lines: Array<Array<Line>>

    constructor(boxDimension: number){
        this.boxDimension = boxDimension;
        // this.dotDimension = boxDimension+1;
        const {boxArr,boxMap} = this.createBoxes(this.boxDimension);
        const {dotArr,dotMap} = this.createDots(this.boxDimension+1);
        this.boxMap=boxMap;
        this.dotMap=dotMap;
        this.boxes=boxArr;
        this.dots=dotArr;
    }

    private createBoxes(N: number): {boxArr: Array<Array<Box>>, boxMap: Map<string,Box>}{
        let boxArr = new Array(N);

        let boxMap= new Map<string,Box>();
        let ctr = 0;
        for(let row=0; row<N; row++){   // y
            let boxRow = new Array(N);
            for(let col=0; col<N; col++){   // x
                let b = new Box(col, row);
                boxRow[col] = b;

                boxMap.set(row+""+col, b);
                ctr++;
            }
            boxArr[row] = boxRow;
        }
        console.log("Board in: boxMap size: "+boxMap.size);
        return {boxArr, boxMap};
    }

    private createDots(N: number): {dotArr: Array<Array<Dot>>, dotMap: Map<string,Dot>}{
        let dotArr: Array<Dot>[] = new Array(N);
        let dotMap= new Map<string,Dot>(); // could use map. But why the overkill if it's JS
        // let dotMapInitArr = [];
        let ctr = 0;
        for(let row=0; row<N; row++){   // y
            let dotRow = new Array(N);
            for(let col=0; col<N; col++){   // x
                let b = new Dot(col, row);
                dotRow[col] = b;
                // dotMapInitArr.push([ctr, b]);
                dotMap.set(row+""+col, b);
                ctr++;
            }
            dotArr[row] = dotRow;
        }

        return {dotArr, dotMap};
    }

    public getBoxDimension(): number{
        return this.boxDimension;
    }

    public getBoxByCoordinates(x: number, y: number): Box{
        return this.boxes[y][x];
    }
    public getBoxByColAndRow(row: number, col: number): Box{
        return this.boxes[row][col];
    }
    public getDotByCoordinates(x: number, y: number): Dot{
        return this.dots[y][x];
    }
    public getDotByColAndRow(row: number, col: number): Dot{
        return this.dots[row][col];
    }

    public displayBoard(){

    }

    public getAdjacentBoxesToALine(a: Dot, b: Dot): Array<Box|undefined>{
        let m = undefined;
        let n = undefined;

        let lesserDot = Dot.getLesserDot(a, b);
        // console.log("lesserDot")
        // console.log(lesserDot)
        // console.log("a")
        // console.log(a)
        // console.log("b")
        // console.log(b)
        if(lesserDot.getX()===0 || lesserDot.getY()===0){
            if(lesserDot.getX()===0 && lesserDot.getY()===0){
                m = this.boxMap.get("00");
            }else if(lesserDot.getX()===0 && a.getX()===b.getX()){
                m = this.boxMap.get(lesserDot.getY()+""+lesserDot.getX());
            }else if(lesserDot.getY()===0 && a.getY()===b.getY()){
                m = this.boxMap.get(lesserDot.getY()+""+lesserDot.getX());
            }else if(lesserDot.getX()===0 && a.getY()===b.getY()){
                m = this.boxMap.get(lesserDot.getY()+""+lesserDot.getX());
                n = this.boxMap.get((lesserDot.getY()-1)+""+lesserDot.getX());
            }else if(lesserDot.getY()===0 && a.getX()===b.getX()){
                m = this.boxMap.get(lesserDot.getY()+""+lesserDot.getX());
                n = this.boxMap.get(lesserDot.getY()+""+(lesserDot.getX()-1));
            }
        }else{
            if(a.getX()===b.getX()){
                m = this.boxMap.get(lesserDot.getY()+""+lesserDot.getX());
                n = this.boxMap.get(lesserDot.getY()+""+(lesserDot.getX()-1));

            }else if(a.getY()===b.getY()){
                m = this.boxMap.get(lesserDot.getY()+""+lesserDot.getX());
                n = this.boxMap.get((lesserDot.getY()-1)+""+lesserDot.getX());
            }
        }
        return [m,n];
    }
}

export default Board