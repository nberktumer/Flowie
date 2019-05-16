import {VariableType} from "./VariableEnums";

export class List {
    name: string
    elementType: VariableType

    constructor(name: string,
                elementType: VariableType) {
        this.name = name
        this.elementType = elementType
    }

}
