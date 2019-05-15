import {BaseFlow} from "./BaseFlow"
import {Condition} from "../../models/Condition"
import {FlowType} from "../../models"
import {ConditionType} from "../../models/VariableEnums";
import {Clazz} from "../project/Clazz";

export class IfFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: IfFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: IfFlowContent | null) {
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

export class IfFlowContent {
    conditions: Condition[]
    conditionType: ConditionType
    trueScopeId: string | null
    falseScopeId: string | null

    constructor(
        conditions: Condition[],
        conditionType: ConditionType,
        trueScopeId: string | null,
        falseScopeId: string | null,
    ) {
        this.conditions = conditions
        this.conditionType = conditionType
        this.trueScopeId = trueScopeId
        this.falseScopeId = falseScopeId
    }

}
