import {BaseFlow} from "./BaseFlow"
import {ArithmeticOperationType, FlowType, VariableType} from "../../models"
import {Func, Parameter} from "../Func"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class ArithmeticFlow implements BaseFlow {

    id: string
    type: FlowType;
    nextFlowId: string | null
    content: ArithmeticFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: ArithmeticFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = (CodeWriter.getInstance().flowIncrementalId++).toString()

    }

    functionInvocation(): string {
        if (this.content == null)
            return ""

        let functionCode = `${this.functionName()}(`

        switch (this.content.operator1.type) {
            case OperatorType.CONSTANT:
                break
            case OperatorType.VARIABLE:
                functionCode += this.content.operator1.variableName
                break
        }

        switch (this.content.operator2.type) {
            case OperatorType.CONSTANT:
                break
            case OperatorType.VARIABLE:
                functionCode += `, ${this.content.operator2.variableName}`
                break
        }

        functionCode += ")"
        return functionCode
    }

    functionName(): string {
        return `arithmeticFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class ArithmeticFlowContent {
    variable: Variable
    operation: ArithmeticOperationType
    operator1: Operator
    operator2: Operator

    constructor(
        variable: Variable,
        operation: ArithmeticOperationType,
        operator1: Operator,
        operator2: Operator,
    ) {
        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2
    }
}

export class Operator {
    type: OperatorType
    variableName: string | undefined
    constantValue: number | undefined

    constructor(
        type: OperatorType,
        name: string | undefined,
        value: number | undefined
    ) {
        this.type = type
        this.variableName = name
        this.constantValue = value
    }
}

export enum OperatorType {
    CONSTANT = "Constant",
    VARIABLE = "Variable"
}
