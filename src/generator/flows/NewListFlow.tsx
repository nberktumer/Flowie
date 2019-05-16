import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Clazz} from "../project/Clazz";
import {List} from "../../models/List";

export class NewListFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: NewListFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: NewListFlowContent | null) {
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
        return `newListFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class NewListFlowContent {
    list: List

    constructor(
        list: List,
    ) {
        this.list = list
    }
}
