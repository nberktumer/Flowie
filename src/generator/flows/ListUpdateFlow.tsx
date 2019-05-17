import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Clazz} from "../project/Clazz";
import {Variable} from "../../models/Variable";

export class ListUpdateFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: ListUpdateFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: ListUpdateFlowContent | null) {
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
        return `listUpdateFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class ListUpdateFlowContent {
    list: Variable
    element: Variable
    index: number

    constructor(
        list: Variable,
        element: Variable,
        index: number
    ) {
        this.list = list
        this.element = element
        this.index = index
    }
}
