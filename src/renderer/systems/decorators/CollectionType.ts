import {ClassConstructor} from "class-transformer/types/interfaces";
import Collection from "../lib/Collection";
import {Transform, Type} from "class-transformer";



export function CollectionType<T>({collectionCls, cls}: { collectionCls: ClassConstructor<Collection<T>>, cls: ClassConstructor<T> }): PropertyDecorator {

    const decorators: PropertyDecorator[] = []

    decorators.push(Transform(({value}: { value: T[] }) => new collectionCls(value), {toClassOnly: true}))
    decorators.push(Transform(({value}: { value: Collection<T> }) => value.items, {toPlainOnly: true}))
    decorators.push(Type(() => cls))

    return function (target: Object, propertyKey: string | symbol): void {
        for (const decorator of decorators) {
            decorator(target, propertyKey)
        }
    }


}


