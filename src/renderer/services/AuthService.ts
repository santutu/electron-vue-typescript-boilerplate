import User, {UserCreateData} from "../models/User";

export default class AuthClient {


    public async login(email: string, password: string): Promise<User> {

        return new User({email: "test@email.com"})
    }

    public async getMe(): Promise<User> {
        return new User({email: "test@email.com"})
    }

    public async logout() {


    }

    public async register(user: UserCreateData): Promise<User> {
        return new User({email: "test@email.com"})

    }


}


export const authClient = new AuthClient()
