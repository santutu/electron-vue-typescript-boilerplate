import BaseValidationRule from "./BaseValidationRule";
import IsNotNullishRule from "./IsNotNullishRule";
import IsNotEmptyRule from "./IsNotEmptyRule";
import Collection from "../Collection";

export default class IsNotEmptyAndNotNullishRule extends BaseValidationRule {

    constructor(
        private value: undefined | null | string | any[] | Collection<any>,
        public key: string
    ) {
        super();
    }

    async validate() {
        return this._validateAnd([
                                     new IsNotNullishRule(this.value, this.key),
                                     new IsNotEmptyRule(this.value!, this.key),
                                 ])

    }
}