import {ConditionOperation, VariableType} from "./VariableEnums"
import {Variable} from "./Variable"
import {Random} from "../utils"

export class Condition {
    id: string = Random.UID()
    variableType: VariableType
    first: Variable
    second: Variable
    operation: ConditionOperation

    constructor(
        variableType: VariableType,
        first: Variable,
        second: Variable,
        operation: ConditionOperation
    ) {
        this.variableType = variableType
        this.first = first
        this.second = second
        this.operation = operation
    }

}

