import {plainToClass, Transform, TransformationType} from 'class-transformer'
import * as _ from 'lodash'
import {flatten} from 'lodash'

interface ClassType<T> {
    new(...args: any[]): T
}

export type TypeChecker<BaseType extends object, ExtendedType extends BaseType = BaseType> = (x: BaseType) => x is ExtendedType
export type TransformPolymorphicType<BaseType extends object, ExtendedType extends BaseType = BaseType> =
    ClassType<ExtendedType> & { typeChecker: TypeChecker<BaseType, ExtendedType> }

export type TransformPolymorphicTypeMap<BaseType extends object> = TransformPolymorphicType<BaseType>[]

/**
 * Transforms simple and array properties if type's typeChecker returns true
 */
export function TypePoly<BaseType extends object>(types: TransformPolymorphicTypeMap<BaseType>) {
    return Transform(({value, obj, type}: { value: BaseType | BaseType[], obj: any, type: TransformationType }) => {
        const values = flatten([value]).map(v => {
            for (const type of types) {
                if (!!value && type.typeChecker(v)) {
                    return plainToClass(type, v)
                }
            }
            throw new Error('TypePoly failed to identify type of plain object')
        })
        return _.isArray(value) ? values : values[0]
    })
}