import ValidationResult from "../validator/ValidationResult";

export default abstract class BaseValidationRule {

    abstract key: string;

    abstract validate(): Promise<ValidationResult>;


    protected async _validateAnd(validations: BaseValidationRule[]): Promise<ValidationResult> {


        for (const validation of validations) {
            const result = await validation.validate()

            if (!result.isValid) {
                return result
            }
        }

        return ValidationResult.validResult;
    }

    protected async _validateOr(validations: BaseValidationRule[]): Promise<ValidationResult> {
        let message = ""
        for (const validation of validations) {
            const result = await validation.validate()

            if (result.isValid) {
                return result
            }

            if (!result.isValid) {
                if (message) {
                    message += " || "
                }
                message += result.message
            }
        }

        return new ValidationResult({
                                        key: this.key,
                                        isValid: false,
                                        message
                                    });
    }

}