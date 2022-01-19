import {Container} from "inversify";
import {interfaces} from "inversify/lib/interfaces/interfaces";


export const container = new Container({defaultScope: "Transient", autoBindInjectable: true});


export function overwrite<T>(bind: interfaces.ServiceIdentifier<T>, to: new (...args: any[]) => T) {
    if (container.isBound(bind)) {
        container.rebind(bind).to(to)
    } else {
        container.bind(bind).to(to)
    }
}