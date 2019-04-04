import {BaseFlow} from "./models/BaseFlow";
import {VariableType} from "../models/VariableEnums";
import {Func, Parameter} from "./Func";
import {CodeWriter} from "./CodeWriter";

export class InputFlow implements BaseFlow {

    id: number
    type: string
    content: InputFlowContent

    constructor(
        id: number,
        type: string,
        content: InputFlowContent) {
        this.id = id
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        CodeWriter.getInstance().writeLineToMainFunction(
            `val ${this.content.writeToVar} = ${this.functionInvocation()}`
        )
        CodeWriter.getInstance().writeCodeFromFlowIndex(this.nextFlow())
    }

    createFunctionCode(): void {
        const functionLines: string[] = []
        functionLines.push(`println("Please enter value for ${this.content.writeToVar}")`)

        let scanCode = ""
        switch (this.content.type) {
            case VariableType.INT:
                scanCode = "readLine()!!.toInt()"
                break
            case VariableType.STRING:
                scanCode = "readLine()"
                break
            default:
                break
        }

        functionLines.push(`val ${this.content.writeToVar} = ${scanCode}`)
        functionLines.push(`return ${this.content.writeToVar}`)

        const parameters: Parameter[] = []

        const func = new Func(
            this.functionName(),
            parameters,
            this.content.type.toString(),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)
    }

    functionInvocation(): string {
        return `${this.functionName()}()`;
    }

    functionName(): string {
        return `inputFlow${this.id}`;
    }

    nextFlow(): number {
        return this.content.nextFlowId;
    }

}

export class InputFlowContent {
    writeToVar: string
    type: VariableType
    nextFlowId: number

    constructor(
        writeToVar: string,
        type: VariableType,
        nextFlowId: number
    ) {
        this.writeToVar = writeToVar
        this.type = type
        this.nextFlowId = nextFlowId
    }
}