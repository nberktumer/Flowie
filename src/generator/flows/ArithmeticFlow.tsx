import {BaseFlow} from "./BaseFlow"
import {ArithmeticOperationType, FlowType, VariableType} from "../../models"
import {Func, Parameter} from "../Func"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class ArithmeticFlow implements BaseFlow {

    id: string
    nextFlowId: string
    type: FlowType
    content: ArithmeticFlowContent | null

    constructor(
        id: string,
        nextFlowId: string,
        type: FlowType,
        content: ArithmeticFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        if (this.content == null)
            return

        let variableSetCode = ""

        if (CodeWriter.getInstance().addVariable(this.content.variable.name)) {
            variableSetCode = "var "
        }

        CodeWriter.getInstance().writeLineToMainFunction(
            `${variableSetCode}${this.content.variable.name} = ${this.functionInvocation()}`
        )
        CodeWriter.getInstance().writeMainCodeFromFlow(this.nextFlow())
    }

    createFunctionCode(): void {
        if (this.content == null)
            return

        const functionLines: string[] = []

        const parameters: Parameter[] = []

        if (this.content.operator1.type === OperatorType.VARIABLE) {
            if (this.content.operator1.variableName != null) {
                parameters.push(new Parameter(
                    this.content.operator1.variableName,
                    VariableType.INT.toString()))
            }
        }

        if (this.content.operator2.type === OperatorType.VARIABLE) {
            if (this.content.operator2.variableName != null) {
                parameters.push(new Parameter(
                    this.content.operator2.variableName,
                    VariableType.INT.toString()))
            }
        }

        let operationCode = ""
        switch (this.content.operation) {
            case ArithmeticOperationType.ADDITION:
                operationCode = "+"
                break
            case ArithmeticOperationType.SUBTRACTION:
                operationCode = "-"
                break
            case ArithmeticOperationType.MULTIPLICATION:
                operationCode = "*"
                break
            case ArithmeticOperationType.DIVISION:
                operationCode = "/"
                break
        }

        let operator1Code = ""
        let operator2Code = ""

        switch (this.content.operator1.type) {
            case OperatorType.CONSTANT:
                operator1Code += this.content.operator1.constantValue
                break
            case OperatorType.VARIABLE:
                operator1Code += this.content.operator1.variableName
                break
        }

        switch (this.content.operator2.type) {
            case OperatorType.CONSTANT:
                operator2Code += this.content.operator2.constantValue
                break
            case OperatorType.VARIABLE:
                operator2Code += this.content.operator2.variableName
                break
        }

        const arithmeticCode = `val result = ` +
            `${operator1Code} ${operationCode} ${operator2Code}`

        functionLines.push(arithmeticCode)
        functionLines.push(`return result`)

        const func = new Func(
            this.functionName(),
            parameters,
            VariableType.INT.toString(),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)

    }

    functionInvocation(): string {
        if (this.content == null)
            return ""

        let functionCode = `${this.functionName()}(`

        switch (this.content.operator1.type) {
            case OperatorType.CONSTANT:
                break
            case OperatorType.VARIABLE:
                functionCode += this.content.operator1.variableName
                break
        }

        switch (this.content.operator2.type) {
            case OperatorType.CONSTANT:
                break
            case OperatorType.VARIABLE:
                functionCode += `, ${this.content.operator2.variableName}`
                break
        }

        functionCode += ")"
        return functionCode
    }

    functionName(): string {
        return `arithmeticFlow${this.id}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class ArithmeticFlowContent {
    variable: Variable
    operation: ArithmeticOperationType
    operator1: Operator
    operator2: Operator

    constructor(
        variable: Variable,
        operation: ArithmeticOperationType,
        operator1: Operator,
        operator2: Operator,
    ) {
        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2
    }
}

export class Operator {
    type: OperatorType
    variableName: string | undefined
    constantValue: number

    constructor(
        type: OperatorType,
        name: string | undefined,
        value: number
    ) {
        this.type = type
        this.variableName = name
        this.constantValue = value
    }
}

export enum OperatorType {
    CONSTANT = "Constant",
    VARIABLE = "Variable"
}
