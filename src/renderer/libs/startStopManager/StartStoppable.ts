export default function startStoppable() {
    return (target) => {

        for (let propName of Object.getOwnPropertyNames(target.prototype)) {
            try {
                if (target.prototype[propName] && propName !== "constructor" && typeof target.prototype[propName] == 'function') {
                    let originalMethod = target.prototype[propName];


                    target.prototype[propName] = async function (...args: any[]) {
                        await this.startStopManager.checkStopIsRequestedAndTrow();
                        const output = await originalMethod.apply(this, args);
                        await this.startStopManager.checkStopIsRequestedAndTrow();
                        return output;

                    }
                } else {
                }
            } catch (e) {
                console.log("startStoppable error");
                console.error(e)
            }

        }
        return target
    }
}
