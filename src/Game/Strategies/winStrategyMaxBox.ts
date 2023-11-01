import { Box } from "../../Board/producer";
import { Player } from "../consumer";
import { Game } from "../services/game.service";
import winningStrategy from "./WinStrategy";

export default class MaxBoxWin implements winningStrategy{

    checkWin(g: Game): Player | null {
        let playerBoxCount: Map<string, number> = new Map();
        let dim = g.board?.boxDimension!
        let thresholdCount = Math.floor(dim*dim/2);
        for(const [key, box] of g.board?.boxMap!){
            
            if(box.getOwner()){
                // console.log("owner based box")
                playerBoxCount.set(box.getOwner()?.name!, playerBoxCount.get(box.getOwner()?.name!) ? playerBoxCount.get(box.getOwner()?.name!)! +1 : 1);
                if(playerBoxCount.get(box.getOwner()?.name!)! > thresholdCount){
                    return box.getOwner();
                }
            }
        }
        console.log(playerBoxCount)
        return null;
    }
}