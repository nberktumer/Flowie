import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Clazz} from "../project/Clazz";
import {Variable} from "../../models/Variable";

export class ListSizeFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: ListSizeFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: ListSizeFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = ""
    }

    functionInvocation(): string {
        return `${this.functionName()}()`
    }

    functionName(): string {
        return `listSizeFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class ListSizeFlowContent {
    setToVariable: Variable
    list: Variable

    constructor(
        setToVariable: Variable,
        list: Variable,
    ) {
        this.setToVariable = setToVariable
        this.list = list
    }
}
