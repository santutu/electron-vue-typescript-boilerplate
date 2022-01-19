import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from 'vuex-module-decorators'
import {store} from "../index";
import User, {UserCreateData, UserLoginData} from "../../models/User";


export class AuthClient {


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


const authClient = new AuthClient()

//////////////////////////////////////////////

@Module({
            store,
            name: 'auth',
            namespaced: true,
            dynamic: true
        })
export class AuthStore extends VuexModule {
    user: User | null = null

    @Mutation
    setUser(user: User | null) {
        this.user = user
    }


    @MutationAction
    async login(payload: UserLoginData) {
        const user = await authClient.login(payload.email, payload.password)
        return {user}
    }

    @MutationAction
    async logout() {
        await authClient.logout();
        return {user: null} as any
    }

    get isAuth(): boolean {
        return this.user !== null
    }


}

export default getModule(AuthStore);

