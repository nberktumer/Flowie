import {Variable} from "../../models/Variable";
import {DirectoryItem, DirectoryItemType} from "./DirectoryItem";
import {Project} from "./Project";

export class DataClazz implements DirectoryItem {
    type: DirectoryItemType;
    name: string
    variables: Variable[] = []

    constructor(name: string, variables: Variable[]) {
        this.type = DirectoryItemType.DATA_CLASS
        this.name = name
        this.variables = variables
    }

    addVariable(variable: Variable) {
        this.variables.push(variable)
    }

    generateCode() {
        /*
        const clazzSignature = Project.codeStrategy.getClazzSignature(this)
                if (clazzSignature) {
                    this.generatedCode.push(clazzSignature)
                }
         */
    }
}
