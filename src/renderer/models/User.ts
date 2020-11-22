import {ClassProperties} from "../../libs/types";

export default class User {
    email!: string

    constructor(params: ClassProperties<User>) {
        Object.assign(this, params)
    }
}

export class UserLoginData {
    email!: string
    password!: string

    constructor(params: ClassProperties<UserLoginData>) {
        Object.assign(this, params)
    }

}

export class UserCreateData {
    email!: string
    password!: string

    constructor(params: ClassProperties<UserCreateData>) {
        Object.assign(this, params)
    }

}

