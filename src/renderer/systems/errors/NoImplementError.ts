export default class NoImplementError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, NoImplementError.prototype);
    }


}