import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class AssignmentFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: AssignmentFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: AssignmentFlowContent | null) {
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
        return `assignmentFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class AssignmentFlowContent {
    variable: Variable

    constructor(
        variable: Variable,
    ) {
        this.variable = variable
    }
}
