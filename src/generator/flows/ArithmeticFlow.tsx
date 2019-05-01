import {BaseFlow} from "./BaseFlow"
import {ArithmeticOperationType, FlowType} from "../../models"
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

        if (this.content.operator1.name !== undefined) {
            functionCode += this.content.operator1.name
        }

        if (this.content.operator2.name !== undefined) {
            functionCode += `, ${this.content.operator2.name}`
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
    operator1: Variable
    operator2: Variable

    constructor(
        variable: Variable,
        operation: ArithmeticOperationType,
        operator1: Variable,
        operator2: Variable,
    ) {
        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2
    }
}
