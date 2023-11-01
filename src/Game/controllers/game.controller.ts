import { Direction, Dot, Line, Direction2D, Player } from "../consumer";
import { Game, GameState } from "../services/game.service";
import IllegalMoveError from "../Errors/IllegalMoveError";
import { Box } from "../../Board/producer";


class GameController{

    private game : Game;

    constructor(g: Game){
        this.game = g;
    }

    public move(dotA: string, dotB: string, player: Player, playersMove: number){
        let dotARef = this.game.board?.dotMap.get(dotA)!;
        let dotBRef = this.game.board?.dotMap.get(dotB)!;
        if(!dotARef || !dotBRef) throw new IllegalMoveError('Please enter valid values for dot references. Cannot find one of the dots');
        let line = this.checkAndCreateLine(dotARef, dotBRef, player);
        
        // if a valid line. Then check if a new box is formed/owned?
        let numOfBoxes = this.checkAndUpdateBox(dotARef, dotBRef, line);
        playersMove = numOfBoxes > 0? playersMove+1: playersMove
        this.game.addMove(line);
        playersMove = this.game.boxCreationReward(playersMove, numOfBoxes);
        this.game.checkWin();
        return playersMove;
    }

    private checkAndCreateLine(dotA: Dot, dotB: Dot, player: Player) : Line{
        if(dotA.getX()===dotB.getX() && dotA.getY()===dotB.getY()){
            throw new IllegalMoveError("Need two adjacent dots to make a move. Cannot use the same dot for both ends of line.")
        }
        let directionA: Direction;
        let directionB: Direction;

        if(dotA.getY()===dotB.getY()){
            if(dotA.getX()>dotB.getX() && dotA.getX()-1===dotB.getX()){
                directionA = Direction.LEFT;
                directionB = Direction.RIGHT;
            }else if(dotB.getX()>dotA.getX() && dotB.getX()-1===dotA.getX()){
                directionA = Direction.RIGHT;
                directionB = Direction.LEFT;
            }else{
                throw new IllegalMoveError("Cannot connect the non-adjacent dots for a move;")
            }
        }else if(dotA.getX()===dotB.getX()){
            if(dotA.getY()>dotB.getY() && dotA.getY()-1===dotB.getY()){
                directionA = Direction.TOP;
                directionB = Direction.BOTTOM;
            }else if(dotB.getY()>dotA.getY() && dotB.getY()-1===dotA.getY()){
                directionA = Direction.BOTTOM;
                directionB = Direction.TOP;
            }else{
                throw new IllegalMoveError("Cannot connect the non-adjacent dots for a move;")
            }
        }else{
            throw new IllegalMoveError("Cannot connect the non-adjacent dots for a move;")
        }

        if(dotA.getLine(directionA) || dotB.getLine(directionB)){
            throw new IllegalMoveError("Cannot create a line. Line is already present.")
        }

        let line = new Line(dotA, dotB);
        line.setPlayer(player)
        dotA.setLine(line, directionA);
        dotB.setLine(line, directionB);

        return line;
    }

    private checkAndUpdateBox(a: Dot, b: Dot, line: Line){
        let boxCreated = false;
        let numOfBoxes = 0;
        // let lesserDot = Dot.getLesserDot(a, b);
        let directionOfLine : Direction2D = a.getY()==b.getY() ? Direction2D.HORIZONTAL : Direction2D.VERTICAL;

        let [boxN, boxM] = this.game.board!.getAdjacentBoxesToALine(a, b);
        let lesserBox = boxN && boxM ? Box.getLesserBox(boxN, boxM) : boxM ? boxN : boxM;
        if(directionOfLine===Direction2D.HORIZONTAL){
            lesserBox?.setLine(line, Direction.BOTTOM)
            if(boxM && boxN){
                lesserBox===boxM ? boxN?.setLine(line, Direction.TOP) : boxM?.setLine(line, Direction.TOP);
            }else{
                boxN ? boxN?.setLine(line, Direction.TOP) : boxM?.setLine(line, Direction.TOP);
            }
        }else{
            lesserBox?.setLine(line, Direction.RIGHT)
            if(boxM && boxN){
                lesserBox===boxM ? boxN?.setLine(line, Direction.LEFT) : boxM?.setLine(line, Direction.LEFT);
            }else{
                boxN ? boxN?.setLine(line, Direction.LEFT) : boxM?.setLine(line, Direction.LEFT);
            }
        }

        if(boxM?.getLine(Direction.BOTTOM) && boxM?.getLine(Direction.TOP)
            && boxM?.getLine(Direction.RIGHT) && boxM?.getLine(Direction.LEFT)
        ){
            boxM.setCaptured(true);
            boxM.setOwner(line.getPlayer()!);
            boxCreated = true;
            numOfBoxes++;
        }
        if(boxN?.getLine(Direction.BOTTOM) && boxN?.getLine(Direction.TOP)
            && boxN?.getLine(Direction.RIGHT) && boxN?.getLine(Direction.LEFT)
        ){
            boxN.setCaptured(true);
            boxN.setOwner(line.getPlayer()!);
            boxCreated = true;
            numOfBoxes++;
        }

        console.log("2222===lesserBox")
        console.log(lesserBox)
        console.log("2222===boxM")
        console.log(boxM)
        console.log("2222===boxN")
        console.log(boxN)
        console.log(directionOfLine)

        return numOfBoxes;
    }

    public setGameState(state: GameState){
        this.game.gameState = state;
    }

    public displayBoard(){
        let dim = this.game.board!.getBoxDimension();
        let dotMap = this.game.board!.dotMap;
        let boxMap = this.game.board!.boxMap;

        let pixelRow1 = '';
        let pixelRow2 = '';
        // let pixelRow3 = '';
        // let pixelRow4 = '';
        // let keyArray = boxMap.keys()// Object.keys(boxMap);
        // let keyArrayDots = dotMap.keys()// Object.keys(dotMap);
        // let valueArray = boxMap.entries(); // Object.keys(boxMap);
        // let valueArrayDots = dotMap.entries() // Object.keys(dotMap);
        // console.log("keyArray.length")
        // console.log(keyArray.length+ " "+valueArray.length)
        // console.log(keyArrayDots.length+ " "+ valueArrayDots.length)
        // console.log(boxMap.size);
        // for(let [key, value] of boxMap){
        //     console.log(value);
        //     if(value?.getCaptured()){
        //         // console.log(boxMap.keys().);
        //         console.log(value?.getOwner()?.name);
        //     }
        // }

        for(let row=0; row<=dim; row++ ){
            for(let col=0; col<=dim; col++ ){
                let thisDot = dotMap.get(row+""+col)!;
                // console.log(col + " "+ row);
                if(col==dim || row==dim){   // NO BOXES
                    // console.log("No boxes")
                    if(col==dim && row==dim){   // bottomleft corner
                        // console.log("bottomleft")
                        pixelRow1 += row+""+col+".";
                    }else if(col==dim){   // rightmost point
                        // console.log("rightmost")
                        pixelRow1 += row+""+col+".";

                        pixelRow2 += "  ";
                        pixelRow2 += thisDot.getLine(Direction.BOTTOM)? "|" : " ";
                    }else{      // bottommost row of points
                        // console.log("bottommost row")
                        pixelRow1 += row+""+col+".";
                        pixelRow1 += thisDot.getLine(Direction.RIGHT)? "___" : "   ";

                        // no pixelRow2;
                    }
                }else{
                    // console.log("col!=dim")
                    let thisBox = boxMap.get(row+""+col)!;
                    pixelRow1 += row+""+col+".";
                    pixelRow1 += thisDot.getLine(Direction.RIGHT)? "___" : "   ";

                    pixelRow2 += "  ";
                    pixelRow2 += thisDot.getLine(Direction.BOTTOM)? "|" : " ";
                    pixelRow2 += thisBox.getCaptured()? " "+thisBox.getOwner()!.symbol+" " : "   ";
                }
                
            }
            console.log(pixelRow1);
            console.log(pixelRow2);
            pixelRow1 = '';
            pixelRow2 = '';
        }
    }
}

export default GameController;