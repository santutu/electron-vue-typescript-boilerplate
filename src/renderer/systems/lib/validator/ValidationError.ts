import {ValidationErrorMessage} from "./Validator";

export default class ValidationError extends Error {


    constructor(
        public validationErrors: ValidationErrorMessage[],
        public key: string
    ) {
        super(`${key} ${validationErrors.map(error => error.key + ": " + error.message).join(', ')}`)
        Object.setPrototypeOf(this, ValidationError.prototype);
    }


}