import {BaseFlow} from "./BaseFlow"
import {FlowType, VariableType} from "../../models/VariableEnums"
import {Func, Parameter} from "../Func"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"

export class InputFlow implements BaseFlow {

    id: string
    nextFlowId: string
    type: FlowType
    content: InputFlowContent | null

    constructor(
        id: string,
        nextFlowId: string,
        type: FlowType,
        content: InputFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        if (this.content == null)
            return

        CodeWriter.getInstance().writeLineToMainFunction(
            `var ${this.content.variable.name} = ${this.functionInvocation()}`
        )
        CodeWriter.getInstance().writeMainCodeFromFlow(this.nextFlow())
    }

    createFunctionCode(): void {
        if (this.content == null)
            return

        const functionLines: string[] = []
        functionLines.push(`println("Please enter value for ${this.content.variable.name}")`)

        let scanCode = ""
        switch (this.content.variable.type) {
            case VariableType.INT:
                scanCode = "readLine()!!.toInt()"
                break
            case VariableType.STRING:
                scanCode = "readLine()"
                break
            default:
                break
        }

        let variableSetCode = ""
        if (CodeWriter.getInstance().addVariable(this.content.variable.name)) {
            variableSetCode = "val "
        }

        functionLines.push(`${variableSetCode}${this.content.variable.name} = ${scanCode}`)
        functionLines.push(`return ${this.content.variable.name}`)

        const parameters: Parameter[] = []

        const func = new Func(
            this.functionName(),
            parameters,
            this.content.variable.type.toString(),
            functionLines
        )

        CodeWriter.getInstance().writeFunction(func)
    }

    functionInvocation(): string {
        return `${this.functionName()}()`
    }

    functionName(): string {
        return `inputFlow${this.id}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class InputFlowContent {
    variable: Variable

    constructor(
        variable: Variable,
    ) {
        this.variable = variable
    }
}
