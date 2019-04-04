import {BaseFlow} from "./BaseFlow";
import {CodeWriter} from "../code/CodeWriter";
import {Condition} from "../../models/Condition";
import {ConditionOperation, FlowType} from "../../models/VariableEnums";

export class WhileFlow implements BaseFlow {

    id: number
    type: FlowType
    content: WhileFlowContent

    constructor(
        id: number,
        type: FlowType,
        content: WhileFlowContent) {
        this.id = id
        this.type = type
        this.content = content
    }

    createFunctionCode(): void {
        //
    }

    createMainCode(): void {
        const nextScopeId = this.content.scopeId

        let conditionCode = ""
        this.content.conditions.forEach((condition) => {
            conditionCode += condition.first.name

            if (condition.second !== null) {
                conditionCode += " "

                switch (condition.operation) {
                    case ConditionOperation.EQUALS:
                        conditionCode += "=="
                        break
                    case ConditionOperation.NOT_EQUALS:
                        conditionCode += "!="
                        break
                }

                conditionCode += " " + condition.second.name
            }
        })

        CodeWriter.getInstance().writeLineToMainFunction("while(" + conditionCode + ") {")
        CodeWriter.getInstance().scopeCount++


        if (nextScopeId != null) {
            CodeWriter.getInstance().addToLoopStack(this.id)
            CodeWriter.getInstance().writeMainCodeFromFlow(nextScopeId)
        }

        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLineToMainFunction("}")
        CodeWriter.getInstance().writeMainCodeFromFlow(this.nextFlow())
    }

    functionInvocation(): string {
        return ""
    }

    functionName(): string {
        return "";
    }

    hasExternalDependencies(): boolean {
        return false;
    }

    nextFlow(): number {
        return this.content.nextFlowId;
    }

}

export class WhileFlowContent {
    conditions: Condition[]
    scopeId: number | null
    nextFlowId: number

    constructor(
        conditions: Condition[],
        scopeId: number,
        nextFlowId: number
    ) {
        this.conditions = conditions
        this.scopeId = scopeId
        this.nextFlowId = nextFlowId
    }

}
