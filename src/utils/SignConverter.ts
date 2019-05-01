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
            default:
                return "UNKNOWN"
        }
    }

    static booleanOperation(type: ConditionOperation): string {
        switch (type) {
            case ConditionOperation.EQUALS:
                return "=="
            case ConditionOperation.NOT_EQUALS:
                return "!="
            default:
                return "UNKNOWN"
        }
    }
}
