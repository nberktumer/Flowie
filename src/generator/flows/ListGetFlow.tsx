import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Clazz} from "../project/Clazz";
import {Variable} from "../../models/Variable";

export class ListGetFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: ListGetFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: ListGetFlowContent | null) {
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
        return `listGetFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class ListGetFlowContent {
    setToVariable: Variable
    list: Variable
    index: number

    constructor(
        setToVariable: Variable,
        list: Variable,
        index: number
    ) {
        this.setToVariable = setToVariable
        this.list = list
        this.index = index
    }
}
