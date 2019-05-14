import {Variable} from "../../models/Variable";
import {DirectoryItem, DirectoryItemType} from "./DirectoryItem";
import {Code} from "../code/Code";
import {Project} from "./Project";

export class DataClazz implements DirectoryItem {
    type: DirectoryItemType;
    name: string
    variables: Variable[] = []
    generatedCode: string[] = []
    indentationCount = 0
    code = new Code(this.indentationCount)

    constructor(name: string, variables: Variable[]) {
        this.type = DirectoryItemType.DATA_CLASS
        this.name = name
        this.variables = variables
    }

    incrementIndentation() {
        this.indentationCount++
    }

    decrementIndentation() {
        this.indentationCount--
    }

    addVariable(variable: Variable) {
        this.variables.push(variable)
    }

    generateCode() {
        Project.codeStrategy.generateDataClazz(this)
    }
}
