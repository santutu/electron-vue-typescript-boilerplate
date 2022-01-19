import BaseValidationRule from "./BaseValidationRule";
import IsNullishRule from "./IsNullishRule";
import IsEmptyRule from "./IsEmptyRule";
import Collection from "../Collection";

export default class IsEmptyOrNullishRule extends BaseValidationRule {

    constructor(
        private value: undefined | null | string | any[] | Collection<any>,
        public key: string
    ) {
        super();
    }

    async validate() {
        return this._validateOr([
                                    new IsNullishRule(this.value, this.key),
                                    new IsEmptyRule(this.value!, this.key),
                                ],
        )

    }
}