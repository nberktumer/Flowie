import {AbstractPortFactory, PortModel} from "nberktumer-react-diagrams"
import {DefaultPortModel} from "./DefaultPort"

export class PortFactory extends AbstractPortFactory {
    cb: (initialConfig?: any) => DefaultPortModel

    constructor(type: string, cb: (initialConfig?: any) => DefaultPortModel) {
        super(type)
        this.cb = cb
    }

    getNewInstance(initialConfig?: any): DefaultPortModel {
        return this.cb(initialConfig)
    }
}
