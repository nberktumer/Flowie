import {BaseFlow} from "./BaseFlow";
import {FlowType} from "../../models";
import {Clazz} from "../project/Clazz";
import {Variable} from "../../models/Variable";

export class DataClassFlow implements BaseFlow {
    id: string
    nextFlowId: string | null
    type: FlowType
    content: DataClassFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: DataClassFlowContent | null) {
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
        return `dataClassFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class DataClassFlowContent {
    name: string
    dataClassName: string
    variables: Variable[]

    constructor(
        name: string,
        dataClassName: string,
        variables: Variable[]
    ) {
        this.name = name
        this.dataClassName = dataClassName
        this.variables = variables
    }
}
