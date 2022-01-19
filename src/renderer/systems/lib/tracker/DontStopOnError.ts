export default class DontStopOnError extends Error {

    constructor(e: Error | any) {
        super(e.message);
        Object.setPrototypeOf(this, DontStopOnError.prototype);
        this.stack = e.stack;
        this.name = e.name;
        this.message = e.message;
    }


}