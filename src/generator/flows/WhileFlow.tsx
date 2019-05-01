import {BaseFlow} from "./BaseFlow"
import {CodeWriter} from "../code/CodeWriter"
import {Condition} from "../../models/Condition"
import {FlowType} from "../../models"

export class WhileFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: WhileFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: WhileFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = (CodeWriter.getInstance().flowIncrementalId++).toString()
    }

    functionInvocation(): string {
        return ""
    }

    functionName(): string {
        return ""
    }

    hasExternalDependencies(): boolean {
        return false
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

}

export class WhileFlowContent {
    conditions: Condition[]
    scopeId: string | null

    constructor(
        conditions: Condition[],
        scopeId: string | null,
    ) {
        this.conditions = conditions
        this.scopeId = scopeId
    }

}
