import {VariableType} from "./VariableEnums";

export class Variable {

    name: string | undefined
    type: VariableType
    value: any

    constructor(name: string | undefined,
                type: VariableType,
                value: any) {
        this.name = name
        this.type = type
        this.value = value
    }

}
