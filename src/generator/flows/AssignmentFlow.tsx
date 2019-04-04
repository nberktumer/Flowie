import {BaseFlow} from "./BaseFlow";
import {VariableType} from "../../models/VariableEnums";
import {CodeWriter} from "../CodeWriter";
import {Variable} from "../../models/Variable";

export class AssignmentFlow implements BaseFlow {

    id: number
    type: string
    content: AssignmentFlowContent

    constructor(
        id: number,
        type: string,
        content: AssignmentFlowContent) {
        this.id = id
        this.type = type
        this.content = content
    }

    createMainCode(): void {

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

        CodeWriter.getInstance().writeLineToMainFunction(`val ${this.content.variable.name} = ${contentString}`)
        CodeWriter.getInstance().writeCodeFromFlowIndex(this.nextFlow())
    }

    createFunctionCode(): void {

    }

    functionInvocation(): string {
        return `${this.functionName()}()`;
    }

    functionName(): string {
        return `assignmentFlow${this.id}`;
    }

    nextFlow(): number {
        return this.content.nextFlowId;
    }

    hasExternalDependencies(): boolean {
        return false;
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
