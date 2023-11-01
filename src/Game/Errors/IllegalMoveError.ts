
export default class IllegalMoveError extends Error{
    message: string;
    constructor(msg: string){
        super();
        this.name = "IllegalMoveError"
        this.message = msg
    }
}