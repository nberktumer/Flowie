import {Variable} from "./Variable"
import {VariableType} from "./VariableEnums"

export default class ClazzModel {
    name: string
    argList: Variable[]
    returnType: VariableType
    returnListType: VariableType

    constructor(name: string, argList: Variable[], returnType: VariableType, returnListType: VariableType) {
        this.name = name
        this.argList = argList
        this.returnType = returnType
        this.returnListType = returnListType
    }
}
