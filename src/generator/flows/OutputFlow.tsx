import {BaseFlow} from "./BaseFlow";
import {Func, Parameter} from "../Func";
import {CodeWriter} from "../code/CodeWriter";
import {Variable} from "../../models/Variable";
import {FlowType} from "../../models";

export class OutputFlow implements BaseFlow {

    id: number
    type: FlowType
    content: OutputFlowContent

    constructor(
        id: number,
        type: FlowType,
        content: OutputFlowContent) {
        this.id = id
        this.type = type
        this.content = content
    }

    createMainCode(): void {
        CodeWriter.getInstance().writeLineToMainFunction(this.functionInvocation())
        CodeWriter.getInstance().writeMainCodeFromFlow(this.nextFlow())
    }

    createFunctionCode(): void {
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
        return `${this.functionName()}(${this.content.variable.name})`
    }

    functionName(): string {
        return `outputFlow${this.id}`
    }

    nextFlow(): number {
        return this.content.nextFlowId
    }

    hasExternalDependencies(): boolean {
        return false;
    }

}

export class OutputFlowContent {
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
