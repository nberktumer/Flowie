import {BaseFlow} from "./BaseFlow"
import {FlowType, VariableType} from "../../models"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class AssignmentFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: AssignmentFlowContent | null
    functionCallName: string

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: AssignmentFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
        this.functionCallName = (CodeWriter.getInstance().flowIncrementalId++).toString()
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
                console.log("default...")
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
        return `assignmentFlow${this.functionCallName}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class AssignmentFlowContent {
    variable: Variable

    constructor(
        variable: Variable,
    ) {
        this.variable = variable
    }
}
