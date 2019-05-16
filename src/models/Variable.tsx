import {VariableType} from "./VariableEnums";

export class Variable {

    name: string | undefined
    type: VariableType
    value: any
    listElementType: VariableType | null

    constructor(name: string | undefined,
                type: VariableType,
                value: any,
                listElementType: VariableType | null) {
        this.name = name
        this.type = type
        this.value = value
        this.listElementType = listElementType
    }
}
