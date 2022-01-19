interface Params {
    prefix?: string
    maximumNumCache?: number
}

export default class MemoryCache {

    private prefix;

    public constructor({
                           prefix,
                           maximumNumCache = 50,
                       }: Params) {
        this.prefix = prefix;
        this.maximumNumCache = maximumNumCache;
    }

    protected cache = {};

    protected maximumNumCache: number;

    public setMaximumNumCache(num: number) {
        this.maximumNumCache = num;
        return this;
    }

    public clear() {
        this.cache = {};
        return this;
    }

    private getCacheLength(): number {
        return Object.keys(this.cache).length
    }

    public remember<T>(key: string, cb: () => T) {
        if (this.maximumNumCache !== 0 && this.getCacheLength() >= this.maximumNumCache) {
            this.clear();
        }

        if (this.cache[this.getKey(key)] !== undefined) {
            console.log(`hit cache ${key}!`);
            return this.cache[this.getKey(key)]
        }
        return this.cache[this.getKey(key)] = cb();
    }

    public forget(key: string) {
        delete this.cache[this.getKey(key)];
        return this;
    }

    public setPrefix(prefix: string) {
        if (this.getCacheLength() > 0) {
            throw new Error('can not set prefix, when has cache');
        }
        this.prefix = prefix;
        return this;
    }

    public getPrefix() {
        return this.prefix;
    }

    protected getKey(key: string) {
        return this.prefix + key;
    }
}