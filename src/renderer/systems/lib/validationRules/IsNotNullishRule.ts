import ValidationResult from "../validator/ValidationResult";
import BaseValidationRule from "./BaseValidationRule";

export default class IsNotNullishRule extends BaseValidationRule {

    constructor(
        private value: any,
        public key: string
    ) {
        super();
    }

    async validate() {

        if (this.value === undefined || this.value === null) {
            return new ValidationResult({
                                            isValid: false,
                                            message: `${this.key} can't be null or undefined`,
                                            key: this.key
                                        },)
        }

        return ValidationResult.validResult;
    }
}