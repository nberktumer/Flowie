import {BaseFlow} from "./BaseFlow";
import {FlowType, VariableType} from "../../models";
import {Clazz} from "../project/Clazz";
import {Variable} from "../../models/Variable";

export class FunctionalityFlow implements BaseFlow {
    id: string
    nextFlowId: string | null
    type: FlowType
    content: FunctionalityFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: FunctionalityFlowContent | null) {
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
        return `functionalityFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : Clazz.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class FunctionalityFlowContent {
    clazzName: string
    functionName: string
    variables: Variable[]
    assignVariable: Variable
    returnType: VariableType

    constructor(
        clazzName: string,
        functionName: string,
        variables: Variable[],
        assignVariable: Variable,
        returnType: VariableType
    ) {
        this.clazzName = clazzName
        this.functionName = functionName
        this.variables = variables
        this.assignVariable = assignVariable
        this.returnType = returnType
    }
}
