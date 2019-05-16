import {VariableType} from "./VariableEnums";

export class Variable {

    name: string | undefined
    type: VariableType
    value: any
    listElementType: VariableType | undefined

    constructor(name: string | undefined,
                type: VariableType,
                value: any,
                listElementType?: VariableType) {
        this.name = name
        this.type = type
        this.value = value
        this.listElementType = listElementType
    }
}
