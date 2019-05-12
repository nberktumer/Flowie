import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Variable} from "../../models/Variable"
import {Clazz} from "../project/Clazz";

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
        this.functionCallName = (Clazz.flowIncrementalId++).toString()
    }

    functionInvocation(): string {
        return `${this.functionName()}()`
    }

    functionName(): string {
        return `assignmentFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
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
