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

    getItem(index: number): T {
        return this.items[index];
    }


    maximum(maximum: number): T[] {
        return this.items.slice(0, maximum);
    }
}
