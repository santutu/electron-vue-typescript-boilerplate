// 1 Transform the type to flag all the undesired keys as 'never'
type FlagExcluded<Base, Type> = { [Key in keyof Base]: Base[Key] extends Type ? never : Key };

// 2 Get the keys that are not flagged as 'never'
type AllowedNames<Base, Type> = FlagExcluded<Base, Type>[keyof Base];

// 3 Use this with a simple Pick to get the right interface, excluding the undesired type
type OmitType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>;

// 4 Exclude the Function type to only get properties
export type Properties<T> = OmitType<T, Function>;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type PropertiesOmit<T, K extends keyof T> = Omit<Properties<T>, K>
export type PropertiesOptional<T, K extends keyof Properties<T>>
    = Optional<Properties<T>, K>


export type Enum<E> = Record<keyof E, number | string> & { [k: number]: string };


export type Nullable<T> = T | null;