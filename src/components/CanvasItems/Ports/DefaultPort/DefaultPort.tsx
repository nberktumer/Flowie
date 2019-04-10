import {DefaultPortType} from "./DefaultPortType"
import {DefaultPortLocation} from "./DefaultPortLocation"

export class DefaultPort {
    type: DefaultPortType
    location: DefaultPortLocation

    constructor(type: DefaultPortType, location: DefaultPortLocation) {
        this.type = type
        this.location = location
    }
}
