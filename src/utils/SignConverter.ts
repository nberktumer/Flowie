import {ArithmeticOperationType} from "../models"
import {ConditionOperation} from "../models/VariableEnums"

export class SignConverter {

    static arithmeticOperation(type: ArithmeticOperationType): string {
        switch (type) {
            case ArithmeticOperationType.ADDITION:
                return "+"
            case ArithmeticOperationType.SUBTRACTION:
                return "-"
            case ArithmeticOperationType.MULTIPLICATION:
                return "*"
            case ArithmeticOperationType.DIVISION:
                return "/"
            case ArithmeticOperationType.ROOT:
                return "root"
            default:
                return "UNKNOWN"
        }
    }

    static booleanOperation(type: ConditionOperation): string {
        switch (type) {
            case ConditionOperation.GREATER_THAN:
                return ">"
            case ConditionOperation.GREATER_THAN_OR_EQUALS:
                return ">="
            case ConditionOperation.LESS_THAN:
                return "<"
            case ConditionOperation.LESS_THAN_OR_EQUALS:
                return "<="
            case ConditionOperation.EQUALS:
                return "=="
            case ConditionOperation.NOT_EQUALS:
                return "!="
            default:
                return "UNKNOWN"
        }
    }
}
