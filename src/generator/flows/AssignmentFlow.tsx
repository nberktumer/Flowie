import {BaseFlow} from "./BaseFlow"
import {FlowType, VariableType} from "../../models"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class AssignmentFlow implements BaseFlow {

    id: number
    type: FlowType
    content: AssignmentFlowContent | null

    constructor(
        id: number,
        type: FlowType,
        content: AssignmentFlowContent | null) {
        this.id = id
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        if (this.content == null)
            return

        let contentString = ""
        switch (this.content.variable.type) {
            case VariableType.INT:
                contentString = this.content.variable.value.toString()
                break
            case VariableType.STRING:
                contentString = `"${this.content.variable.value}"`
                break
            default:
                break
        }

        let variableSetCode = ""
        if (CodeWriter.getInstance().addVariable(this.content.variable.name)) {
            variableSetCode = "var "
        }

        CodeWriter.getInstance().writeLineToMainFunction(`${variableSetCode}${this.content.variable.name} = ${contentString}`)
        CodeWriter.getInstance().writeMainCodeFromFlow(this.nextFlow())
    }

    createFunctionCode(): void {

    }

    functionInvocation(): string {
        return `${this.functionName()}()`
    }

    functionName(): string {
        return `assignmentFlow${this.id}`
    }

    nextFlow(): number {
        return this.content != null ? this.content.nextFlowId : -1
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class AssignmentFlowContent {
    variable: Variable
    nextFlowId: number

    constructor(
        variable: Variable,
        nextFlowId: number
    ) {
        this.variable = variable
        this.nextFlowId = nextFlowId
    }
}
