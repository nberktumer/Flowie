import {BaseFlow} from "./models/BaseFlow";
import {ArithmeticOperationType, VariableType} from "../models/VariableEnums";
import {Func, Parameter} from "./Func";
import {CodeWriter} from "./CodeWriter";

export class ArithmeticFlow implements BaseFlow {

    id: number
    type: string
    content: ArithmeticFlowContent

    constructor(
        id: number,
        type: string,
        content: ArithmeticFlowContent) {
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

        const parameters: Parameter[] = [
            new Parameter(
                this.content.operator1Name,
                VariableType.INT.toString()
            ),
            new Parameter(
                this.content.operator2Name,
                VariableType.INT.toString()
            )
        ]

        let operationCode = ""
        switch (this.content.operation) {
            case ArithmeticOperationType.ADDITION:
                operationCode = "+"
                break;
            case ArithmeticOperationType.SUBSTRACTION:
                operationCode = "-"
                break;
            case ArithmeticOperationType.MULTIPLICATION:
                operationCode = "*"
                break;
            case ArithmeticOperationType.DIVISION:
                operationCode = "/"
                break;
        }

        const arithmeticCode = `val ${this.content.writeToVar} = ` +
            `${this.content.operator1Name} ${operationCode} ${this.content.operator2Name}`

        functionLines.push(arithmeticCode)
        functionLines.push(`return ${this.content.writeToVar}`)

        const func = new Func(
            this.functionName(),
            parameters,
            VariableType.INT.toString(),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)

    }

    functionInvocation(): string {
        return `${this.functionName()}(${this.content.operator1Name}, ${this.content.operator2Name})`
    }

    functionName(): string {
        return `arithmeticFlow${this.id}`
    }

    nextFlow(): number {
        return this.content.nextFlowId
    }

}

export class ArithmeticFlowContent {
    writeToVar: string
    operation: ArithmeticOperationType
    operator1Name: string
    operator2Name: string
    nextFlowId: number

    constructor(
        writeToVar: string,
        operation: ArithmeticOperationType,
        operator1Name: string,
        operator2Name: string,
        nextFlowId: number
    ) {
        this.writeToVar = writeToVar
        this.operation = operation
        this.operator1Name = operator1Name
        this.operator2Name = operator2Name
        this.nextFlowId = nextFlowId
    }
}
