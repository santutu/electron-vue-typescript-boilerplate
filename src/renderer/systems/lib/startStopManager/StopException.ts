export default class StopException extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, StopException.prototype);
    }

}