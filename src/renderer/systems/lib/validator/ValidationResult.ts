interface Params {

    message: string;

    isValid: boolean;

    key: string
}

export default class ValidationResult {

    message!: string

    isValid!: boolean
    key!: string

    constructor(params: Params) {
        Object.assign(this, params);

    }



    static get validResult() {
        return new ValidationResult({isValid: true, message: "", key: ""});
    }

}