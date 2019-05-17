import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Clazz} from "../project/Clazz";
import {Variable} from "../../models/Variable";

export class CurrentTimeFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: CurrentTimeFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: CurrentTimeFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = ""
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
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

}

export class CurrentTimeFlowContent {
    variable: Variable

    constructor(
        variable: Variable
    ) {
        this.variable = variable
    }
}
