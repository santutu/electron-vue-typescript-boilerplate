export default interface Initializable<T> {

    init(...params: any): T
}