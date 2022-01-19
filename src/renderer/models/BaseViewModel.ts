import {Exclude} from "class-transformer";

export default abstract class BaseViewModel<ModelType> {

    @Exclude()
    public model: ModelType

    protected constructor(model: ModelType) {
        this.model = model
    }

}