import {BaseFlow} from "./BaseFlow"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"
import {FlowType} from "../../models"

export class OutputFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: OutputFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: OutputFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = (CodeWriter.getInstance().flowIncrementalId++).toString()
    }

    functionInvocation(): string {
        if (this.content != null) {
            if (this.content.variable.name) {
                return `${this.functionName()}(${this.content.variable.name})`
            } else {
                return `${this.functionName()}()`
            }
        } else {
            return ""
        }
    }

    functionName(): string {
        return `outputFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class OutputFlowContent {
    variable: Variable

    constructor(
        variable: Variable,
    ) {
        this.variable = variable
    }
}
