import {BaseFlow} from "./BaseFlow";
import {FlowType} from "../../models";
import {Variable} from "../../models/Variable";
import {Clazz} from "../project/Clazz";

export class RandomFlow implements BaseFlow {
    id: string
    nextFlowId: string | null
    type: FlowType
    content: RandomFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: RandomFlowContent | null) {
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
        return `randomFlow${this.functionCallName}`
    }

    hasExternalDependencies(): boolean {
        return false;
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

}

export class RandomFlowContent {
    variable: Variable
    min: number
    max: number

    constructor(
        variable: Variable,
        min: number,
        max: number
    ) {
        this.variable = variable
        this.min = min
        this.max = max
    }
}
