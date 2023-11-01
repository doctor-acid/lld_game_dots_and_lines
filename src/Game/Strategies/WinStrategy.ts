import { Player } from "../consumer";
import { Game } from "../services/game.service";

export default interface winningStrategy{
    checkWin(g: Game): Player | null;
}