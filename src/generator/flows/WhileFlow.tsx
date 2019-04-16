import {BaseFlow} from "./BaseFlow"
import {CodeWriter} from "../code/CodeWriter"
import {Condition} from "../../models/Condition"
import {ConditionOperation, FlowType} from "../../models/VariableEnums"

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
        this.functionCallName = (CodeWriter.getInstance().flowIncrementalId++).toString()
    }

    createFunctionCode(): void {
        //
    }

    createMainCode(): void {
        if (this.content == null)
            return

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
        return ""
    }

    hasExternalDependencies(): boolean {
        return false
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

}

export class WhileFlowContent {
    conditions: Condition[]
    scopeId: string | null

    constructor(
        conditions: Condition[],
        scopeId: string | null,
    ) {
        this.conditions = conditions
        this.scopeId = scopeId
    }

}
