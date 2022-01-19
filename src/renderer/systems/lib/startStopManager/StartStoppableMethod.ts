import IStartStoppable from "./IStartStopable";

export default function startStoppableMethod(target, propertyKey: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const startStopManager = (this as IStartStoppable).startStopManager;
        startStopManager.checkStopIsRequestedAndTrow();
        original.apply(this, args);
        startStopManager.checkStopIsRequestedAndTrow();
    };
    return descriptor;
}
