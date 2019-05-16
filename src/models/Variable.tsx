import {VariableType} from "./VariableEnums";

export class Variable {

    name: string | undefined
    type: VariableType
    value: any
    isList: boolean

    constructor(name: string | undefined,
                type: VariableType,
                value: any,
                isList: boolean = false) {
        this.name = name
        this.type = type
        this.value = value
        this.isList = isList
    }

}
