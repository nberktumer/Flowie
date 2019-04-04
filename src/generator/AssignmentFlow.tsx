import {BaseFlow} from "./models/BaseFlow";
import {VariableType} from "../models/VariableEnums";
import {CodeWriter} from "./CodeWriter";

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
        switch (this.content.type) {
            case VariableType.INT:
                contentString = this.content.value.toString()
                break
            case VariableType.STRING:
                contentString = `"${this.content.value}"`
                break
            default:
                break
        }

        CodeWriter.getInstance().writeLineToMainFunction(`val ${this.content.writeToVar} = ${contentString}`)
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

}

export class AssignmentFlowContent {
    writeToVar: string
    type: VariableType
    value: object
    nextFlowId: number

    constructor(
        writeToVar: string,
        type: VariableType,
        value: object,
        nextFlowId: number
    ) {
        this.writeToVar = writeToVar
        this.type = type
        this.value = value
        this.nextFlowId = nextFlowId
    }
}
