import ValidationResult from "../validator/ValidationResult";
import BaseValidationRule from "./BaseValidationRule";
import Collection from "../Collection";

export default class IsNotEmptyRule extends BaseValidationRule {

    constructor(
        private value: string | any[] | Collection<any>,
        public key: string
    ) {
        super();
    }

    async validate() {

        if (typeof this.value === "string") {
            if (this.value.trim() === "" || !this.value) {
                return this.newErrorValidationResult();
            }
        } else if (Array.isArray(this.value)) {
            if (this.value.length === 0) {
                return this.newErrorValidationResult();
            }
        } else if (this.value instanceof Collection) {
            if (this.value.length === 0) {
                return this.newErrorValidationResult();
            }
        }

        return ValidationResult.validResult;
    }

    newErrorValidationResult() {
        return new ValidationResult({isValid: false, message: `${this.key} can't be empty`, key: this.key})
    }
}