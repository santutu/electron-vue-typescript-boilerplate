export default interface DeserializeInitializable<T> {

    initWhenDeserialize(...params: any): T
}