import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Clazz} from "../project/Clazz"
import {Variable} from "../../models/Variable"

export class ReturnFlow implements BaseFlow {
    id: string
    nextFlowId: string | null
    type: FlowType
    content: ReturnFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        returnFlowContent: ReturnFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = returnFlowContent
        this.functionCallName = ""
    }

    functionInvocation(): string {
        return `${this.functionName()}()`
    }

    functionName(): string {
        return `returnFlow${this.functionCallName}`
    }

    hasExternalDependencies(): boolean {
        return false
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }
}

export class ReturnFlowContent {
    returnVariable?: Variable

    constructor(
        returnVariable?: Variable
    ) {
        this.returnVariable = returnVariable
    }
}
