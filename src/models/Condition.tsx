import {ConditionOperation, VariableType} from "./VariableEnums";
import {Variable} from "./Variable";

export class Condition {

    variableType: VariableType
    first: Variable
    second: Variable | null
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
