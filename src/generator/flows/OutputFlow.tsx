import {BaseFlow} from "./BaseFlow"
import {Func, Parameter} from "../Func"
import {CodeWriter} from "../code/CodeWriter"
import {Variable} from "../../models/Variable"
import {FlowType} from "../../models"

export class OutputFlow implements BaseFlow {

    id: string
    nextFlowId: string | null
    type: FlowType
    content: OutputFlowContent | null

    constructor(
        id: string,
        nextFlowId: string | null,
        type: FlowType,
        content: OutputFlowContent | null) {
        this.id = id
        this.nextFlowId = nextFlowId
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        CodeWriter.getInstance().writeLineToMainFunction(this.functionInvocation())
        CodeWriter.getInstance().writeMainCodeFromFlow(this.nextFlow())
    }

    createFunctionCode(): void {
        if (this.content == null || this.content.variable.name === undefined)
            return

        const functionLines: string[] = []
        const parameters: Parameter[] = [
            new Parameter(
                this.content.variable.name,
                this.content.variable.type.toString()
            )
        ]

        const func = new Func(
            this.functionName(),
            parameters,
            undefined,
            functionLines
        )

        functionLines.push("print(\"Value of \")")
        functionLines.push(`print("${this.content.variable.name} is ")`)
        functionLines.push(`println(${this.content.variable.name})`)
        CodeWriter.getInstance().writeFunction(func)

    }

    functionInvocation(): string {
        return this.content != null ? `${this.functionName()}(${this.content.variable.name})` : ""
    }

    functionName(): string {
        return `outputFlow${this.id}`
    }

    nextFlow(): string {
        return this.nextFlowId != null ? this.nextFlowId : CodeWriter.TERMINATION_ID
    }

    hasExternalDependencies(): boolean {
        return false
    }

}

export class OutputFlowContent {
    variable: Variable

    constructor(
        variable: Variable,
    ) {
        this.variable = variable
    }
}
