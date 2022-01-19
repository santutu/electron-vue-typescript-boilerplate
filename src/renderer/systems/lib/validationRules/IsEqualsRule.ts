import ValidationResult from "../validator/ValidationResult";
import BaseValidationRule from "./BaseValidationRule";
import Collection from "../Collection";

export default class IsEqualsRule<T> extends BaseValidationRule {

    constructor(
        private ExpectedValue: T,
        private value: T,
        public key: string
    ) {
        super();
    }

    async validate() {


        if (this.ExpectedValue !== this.value) {
            return new ValidationResult({
                                            isValid: false,
                                            message: `${this.key} must be ${this.ExpectedValue}`,
                                            key: this.key
                                        })
        }

        return ValidationResult.validResult;
    }

}