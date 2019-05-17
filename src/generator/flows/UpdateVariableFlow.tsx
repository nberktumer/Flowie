import {BaseFlow} from "./BaseFlow"
import {FlowType} from "../../models"
import {Variable} from "../../models/Variable"
import {Clazz} from "../project/Clazz";

export class UpdateVariableFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: UpdateVariableFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: UpdateVariableFlowContent | null) {
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
        return `updateVariable${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class UpdateVariableFlowContent {
    setToVariable: Variable
    setFromVariable: Variable

    constructor(
        setToVariable: Variable,
        setFromVariable: Variable
    ) {
        this.setToVariable = setToVariable
        this.setFromVariable = setFromVariable
    }
}
