import ValidationResult from "../validator/ValidationResult";
import BaseValidationRule from "./BaseValidationRule";
import Collection from "../Collection";

export default class NotExpectValue extends BaseValidationRule {

    constructor(
        private notExpectedValue: any,
        private value: any,
        public key: string
    ) {
        super();
    }

    async validate() {


        if (this.notExpectedValue === this.value) {
            return new ValidationResult({
                                            isValid: false,
                                            message: `${this.key} can't be ${this.notExpectedValue}`,
                                            key: this.key
                                        })
        }

        return ValidationResult.validResult;
    }


}