import {ConditionOperation, VariableType} from "./VariableEnums"
import {Variable} from "./Variable"
import {Random} from "../utils"

export class Condition {
    id: string = Random.UID()
    variableType: VariableType
    first: Variable
    second: Variable | Value
    operation: ConditionOperation

    constructor(
        variableType: VariableType,
        first: Variable,
        second: Variable | Value,
        operation: ConditionOperation
    ) {
        this.variableType = variableType
        this.first = first
        this.second = second
        this.operation = operation
    }

}

export class Value {
    variableType: VariableType
    value: any

    constructor(
        variableType: VariableType,
        value: any
    ) {
        this.value = value
        this.variableType = variableType
    }
}
