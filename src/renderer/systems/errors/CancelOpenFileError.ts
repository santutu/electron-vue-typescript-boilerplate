export default class CancelOpenFileError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, CancelOpenFileError.prototype);
    }


}