type ListenerFunc<T> = (params: T) => void;

export default class Event<T = any> {


    private readonly listeners: ListenerFunc<T> [] = [];

    addListener(cb: ListenerFunc<T>) {
        this.listeners.push(cb);
    }

    removeListener(cb: ListenerFunc<T>) {
        const idx = this.listeners.findIndex((v) => {
            return v === cb;
        })

        if (idx === -1) {
            return
        }
        this.listeners.splice(idx, 1);
    }

    invoke(params: T) {
        for (const listener of this.listeners) {
            listener(params);
        }
    }
}