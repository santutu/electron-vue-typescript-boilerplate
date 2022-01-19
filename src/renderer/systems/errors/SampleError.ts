export default class SampleError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, SampleError.prototype);
    }


}