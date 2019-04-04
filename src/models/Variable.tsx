import {VariableType} from "./VariableEnums";

export class Variable {

    name: string
    type: VariableType
    value: any

    constructor(name: string,
                type: VariableType,
                value: any) {
        this.name = name
        this.type = type
        this.value = value
    }

}
