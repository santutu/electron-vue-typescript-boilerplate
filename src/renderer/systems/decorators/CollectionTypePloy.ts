import {ClassConstructor} from "class-transformer/types/interfaces";
import Collection from "../lib/Collection";
import {Transform} from "class-transformer";
import {TransformPolymorphicTypeMap, TypePoly} from "./TypePoly";

export function CollectionTypePloy<BaseType extends object>({collectionCls, types}: { collectionCls: ClassConstructor<Collection<BaseType>>, types: TransformPolymorphicTypeMap<BaseType> }): PropertyDecorator {

    const decorators: PropertyDecorator[] = []

    decorators.push(Transform(({value}: { value: BaseType[] }) => new collectionCls(value), {toClassOnly: true}))
    decorators.push(TypePoly(types))
    decorators.push(Transform(({value}: { value: Collection<BaseType> }) => value.items, {toPlainOnly: true}))
    return function (target: Object, propertyKey: string | symbol): void {
        for (const decorator of decorators) {
            decorator(target, propertyKey)
        }
    }

}



