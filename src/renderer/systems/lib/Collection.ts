import _ from "lodash"

export default class Collection<T> {

    constructor(public items: T[] = []) {

    }

    [Symbol.iterator]() {
        let pointer = 0;
        let items = this.items;

        return {
            next(): IteratorResult<T> {
                if (pointer < items.length) {
                    return {
                        done: false,
                        value: items[pointer++]
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }

    get length(): number {
        return this.items.length
    }

    getItem(index: number | string): T {
        return this.items[index];
    }


    maximum(maximum: number): T[] {
        return this.items.slice(0, maximum);
    }

    add<ItemType extends T>(item: ItemType): ItemType {
        this.items.push(item);
        return item;
    }

    addByList<ItemType extends T>(items: ItemType[]): ItemType[] {
        for (const item of items) {
            this.items.push(item);
        }
        return items;
    }

    addByCollection(collection: Collection<T>): this {
        for (const item of collection.items) {
            this.items.push(item);
        }
        return this;
    }

    toList() {
        const newList: T[] = [];
        for (const item of this.items) {
            newList.push(item)
        }

        return newList;
    }

    slice(start?: number, end?: number): this {

        const newItems = _.chain(this.items).slice(start, end).value();
        this.items.splice(0, this.items.length);
        newItems.forEach(newItem => this.items.push(newItem));
        return this;
    }

    clear() {
        this.items.splice(0, this.items.length)
        return this;
    }

    findIndex(item: T): number {
        return this.items.findIndex(_item => _item === item);
    }

    remove(item: T) {
        const index = this.findIndex(item)
        if (index === -1) throw new Error(`no found item ${item}`);
        this.items.splice(index, 1);
        return this;
    }

    get isEmpty(): boolean {
        return this.length === 0;
    }

    new(items: T[]): this {
        this.items.splice(0, this.items.length, ...items);
        return this;
    }


    get last() {
        return this.items[this.length - 1]
    }

    get first() {
        return this.items[0]
    }
}
