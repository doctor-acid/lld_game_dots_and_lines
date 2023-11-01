import DotInterface from "./dot.model"
import { PlayerInterface } from "../consumer"
interface LineInterface {
    a: DotInterface
    b: DotInterface

    drawn: Boolean
    player: PlayerInterface | undefined
}

export default LineInterface