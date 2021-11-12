import {Properties} from "../types/types";

export default class User {
    email!: string

    constructor(params: Properties<User>) {
        Object.assign(this, params)
    }
}

export class UserLoginData {
    email!: string
    password!: string

    constructor(params: Properties<UserLoginData>) {
        Object.assign(this, params)
    }

}

export class UserCreateData {
    email!: string
    password!: string

    constructor(params: Properties<UserCreateData>) {
        Object.assign(this, params)
    }

}

