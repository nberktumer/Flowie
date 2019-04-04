import {BaseFlow} from "./models/BaseFlow";
import {VariableType} from "../models/VariableEnums";
import {Func, Parameter} from "./Func";
import {CodeWriter} from "./CodeWriter";

export class OutputFlow implements BaseFlow {

    id: number
    type: string
    content: OutputFlowContent

    constructor(
        id: number,
        type: string,
        content: OutputFlowContent) {
        this.id = id
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        CodeWriter.getInstance().writeLineToMainFunction(this.functionInvocation())
        CodeWriter.getInstance().writeCodeFromFlowIndex(this.nextFlow())
    }

    createFunctionCode(): void {
        const functionLines: string[] = []
        const parameters: Parameter[] = [
            new Parameter(
                this.content.writeFromVar,
                this.content.type.toString()
            )
        ]

        const func = new Func(
            this.functionName(),
            parameters,
            undefined,
            functionLines
        )

        functionLines.push("print(\"Value of \")")
        functionLines.push(`print("${this.content.writeFromVar}is ")`)
        functionLines.push(`println(${this.content.writeFromVar})`)
        CodeWriter.getInstance().writeFunction(func)

    }

    functionInvocation(): string {
        return `${this.functionName()}(${this.content.writeFromVar})`
    }

    functionName(): string {
        return `outputFlow${this.id}`
    }

    nextFlow(): number {
        return this.content.nextFlowId
    }

}

export class OutputFlowContent {
    writeFromVar: string
    type: VariableType
    nextFlowId: number

    constructor(
        writeToVar: string,
        type: VariableType,
        nextFlowId: number
    ) {
        this.writeFromVar = writeToVar
        this.type = type
        this.nextFlowId = nextFlowId
    }
}
