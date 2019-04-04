import {BaseFlow} from "./BaseFlow";
import {ArithmeticOperationType, FlowType, VariableType} from "../../models";
import {Func, Parameter} from "../Func";
import {CodeWriter} from "../code/CodeWriter";
import {Variable} from "../../models/Variable";

export class ArithmeticFlow implements BaseFlow {

    id: number
    type: FlowType
    content: ArithmeticFlowContent

    constructor(
        id: number,
        type: FlowType,
        content: ArithmeticFlowContent) {
        this.id = id
        this.type = type
        this.content = content
    }

    createMainCode(): void {
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
        const functionLines: string[] = []

        const parameters: Parameter[] = []

        if (this.content.operator1.type === OperatorType.VARIABLE) {
            parameters.push(new Parameter(
                this.content.operator1.variableName,
                VariableType.INT.toString()))
        }

        if (this.content.operator2.type === OperatorType.VARIABLE) {
            parameters.push(new Parameter(
                this.content.operator2.variableName,
                VariableType.INT.toString()))
        }

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

        let operator1Code = ""
        let operator2Code = ""

        switch (this.content.operator1.type) {
            case OperatorType.CONSTANT:
                operator1Code += this.content.operator1.constantValue
                break;
            case OperatorType.VARIABLE:
                operator1Code += this.content.operator1.variableName
                break;
        }

        switch (this.content.operator2.type) {
            case OperatorType.CONSTANT:
                operator2Code += this.content.operator2.constantValue
                break;
            case OperatorType.VARIABLE:
                operator2Code += this.content.operator2.variableName
                break;
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
        let functionCode = `${this.functionName()}(`

        switch (this.content.operator1.type) {
            case OperatorType.CONSTANT:
                break;
            case OperatorType.VARIABLE:
                functionCode += this.content.operator1.variableName
                break;
        }

        switch (this.content.operator2.type) {
            case OperatorType.CONSTANT:
                break;
            case OperatorType.VARIABLE:
                functionCode += `, ${this.content.operator2.variableName}`
                break;
        }

        functionCode += ")"
        return functionCode
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
    operator1: Operator
    operator2: Operator
    nextFlowId: number

    constructor(
        variable: Variable,
        operation: ArithmeticOperationType,
        operator1: Operator,
        operator2: Operator,
        nextFlowId: number
    ) {
        this.variable = variable
        this.operation = operation
        this.operator1 = operator1
        this.operator2 = operator2
        this.nextFlowId = nextFlowId
    }
}

export class Operator {
    type: OperatorType
    variableName: string
    constantValue: number

    constructor(
        type: OperatorType,
        name: string,
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
