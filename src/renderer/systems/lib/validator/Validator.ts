import BaseValidationRule from "../validationRules/BaseValidationRule";
import ValidationError from "./ValidationError";
import {injectable} from "inversify";

export interface ValidationErrorMessage {
    message: string,
    key?: string
}

@injectable()
export default class Validator {

    errors: ValidationErrorMessage[] = []


    get isValid(): boolean {
        return this.errors.length === 0
    }

    async validate(validationRules: BaseValidationRule[], key: string): Promise<true> {

        this.errors = [];

        for (const rule of validationRules) {
            const validationResult = await rule.validate();
            if (!validationResult.isValid) {
                this.errors.push({
                                     message: validationResult.message,
                                     key: validationResult.key
                                 })
            }
        }


        if (!this.isValid) {
            throw new ValidationError(this.errors, key);
        }

        return true;
    }

}