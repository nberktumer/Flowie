import {BaseFlow} from "./BaseFlow";
import {ArithmeticOperationType, VariableType} from "../../models";
import {Func, Parameter} from "../Func";
import {CodeWriter} from "../CodeWriter";
import {Variable} from "../../models/Variable";

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
        console.log(VariableType.INT)
        console.log(VariableType.INT.toString())
        console.log(this.content.operation)
        console.log(ArithmeticOperationType.MULTIPLICATION.toString())

        CodeWriter.getInstance().writeLineToMainFunction(
            `val ${this.content.variable.name} = ${this.functionInvocation()}`
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
            case ArithmeticOperationType.SUBTRACTION:
                operationCode = "-"
                break;
            case ArithmeticOperationType.MULTIPLICATION:
                operationCode = "*"
                break;
            case ArithmeticOperationType.DIVISION:
                operationCode = "/"
                break;
        }

        const arithmeticCode = `val ${this.content.variable.name} = ` +
            `${this.content.operator1Name} ${operationCode} ${this.content.operator2Name}`

        functionLines.push(arithmeticCode)
        functionLines.push(`return ${this.content.variable.name}`)

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

    hasExternalDependencies(): boolean {
        return false;
    }

}

export class ArithmeticFlowContent {
    variable: Variable
    operation: ArithmeticOperationType
    operator1Name: string
    operator2Name: string
    nextFlowId: number

    constructor(
        variable: Variable,
        operation: ArithmeticOperationType,
        operator1Name: string,
        operator2Name: string,
        nextFlowId: number
    ) {
        this.variable = variable
        this.operation = operation
        this.operator1Name = operator1Name
        this.operator2Name = operator2Name
        this.nextFlowId = nextFlowId
    }
}
