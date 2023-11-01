import { PlayerInterface } from "../consumer"
import DotInterface from "./dot.model"

interface BoxInterface{
    tl: DotInterface
    tr: DotInterface
    bl: DotInterface
    br: DotInterface
    captured: boolean
    owner: PlayerInterface
}

export default BoxInterface;