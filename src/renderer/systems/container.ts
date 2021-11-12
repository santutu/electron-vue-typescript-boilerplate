import {Container} from "inversify";


export const container = new Container({defaultScope: "Transient", autoBindInjectable: true});