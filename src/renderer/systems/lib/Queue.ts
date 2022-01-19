export default class Queue<T> {

    constructor(private items: T[] = []) {
    }

    add(item: T) {
        this.items.push(item)
    }

    addList(items: T[]) {
        items.forEach(item => this.items.push(item));
    }

    queue(): false | T {
        if (this.items.length < 1) {
            return false;
        }

        const item = this.items[0];
        this.items.splice(0, 1)

        return item;
    }

    * queueAll() {
        let item: false | T = false
        while (item = this.queue()) {
            yield item;
        }
    }

    get length(): number {
        return this.items.length;
    }

    getItems() {
        return this.items
    }

    clear() {
        this.items.splice(0, this.items.length);
        return this;
    }

    removeByItem(item: T) {
        const idx = this.items.findIndex((_item) => item === _item)
        if (idx === -1) {
            console.error(item)
            throw new Error("No found item");
        }
        this.items.splice(idx, 1);
        return this;
    }
}