import {BaseFlow} from "./BaseFlow"
import {Condition} from "../../models/Condition"
import {FlowType} from "../../models"
import {ConditionType} from "../../models/VariableEnums";
import {Clazz} from "../project/Clazz";

export class WhileFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: WhileFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: WhileFlowContent | null) {
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

export class WhileFlowContent {
    conditions: Condition[]
    conditionType: ConditionType
    scopeId: string | null

    constructor(
        conditions: Condition[],
        conditionType: ConditionType,
        scopeId: string | null,
    ) {
        this.conditions = conditions
        this.conditionType = conditionType
        this.scopeId = scopeId
    }

}
