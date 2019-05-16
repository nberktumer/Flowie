import {Variable} from "../../models/Variable";
import {DirectoryItem, DirectoryItemType} from "./DirectoryItem";
import {Code, CodeLine} from "../code/Code";
import {Project} from "./Project";
import generate from "@babel/generator";

export class DataClazz implements DirectoryItem {
    type: DirectoryItemType;
    name: string
    variables: Variable[] = []
    generatedCode: string[] = []
    code = new Code(0)
    spacing = "\t"

    constructor(name: string, variables: Variable[]) {
        this.type = DirectoryItemType.DATA_CLASS
        this.name = name
        this.variables = variables

        Project.codeStrategy.generateDataClazz(this)

        this.generateCode()
        console.log(this.getCode())
    }

    addVariable(variable: Variable) {
        this.variables.push(variable)
    }

    generateCode() {
        this.code.lines.forEach((line) => {
            this.generatedCode.push(this.createLineWithSpacing(line))
        })
    }

    getCode(): string {
        return this.generatedCode.join("\n")
    }

    private createLineWithSpacing(codeLine: CodeLine): string {
        let line = ""
        for (let i = 0; i < codeLine.indentationCount; i++) {
            line += this.spacing
        }

        line += codeLine.content
        return line
    }
}
