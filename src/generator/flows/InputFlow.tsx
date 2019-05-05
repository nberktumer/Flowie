import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models/VariableEnums"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class InputFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: InputFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: InputFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = (CodeWriter.getInstance().flowIncrementalId++).toString()
    }

    functionInvocation(): string {
        return `${this.functionName()}()`
    }

    functionName(): string {
        return `inputFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class InputFlowContent {
    variable: Variable

    constructor(
        variable: Variable,
    ) {
        this.variable = variable
    }
}
