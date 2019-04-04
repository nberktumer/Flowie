import {VariableType} from "./VariableEnums";

export class Variable {

    name: string
    type: VariableType
    value: object

    constructor(name: string,
                type: VariableType,
                value: object) {
        this.name = name
        this.type = type
        this.value = value
    }

}
