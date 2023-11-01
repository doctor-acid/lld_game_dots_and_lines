import BoxInterface from "./box.model"
import LineInterface from "./line.model"

interface BoardInterface{
    boxDimension: number
    dotDimension: number
    boxes: Array<Array<BoxInterface>>
    lines: Array<Array<LineInterface>>
}

export default BoardInterface