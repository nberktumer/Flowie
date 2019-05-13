import {Clazz} from "./Clazz"
import {Func} from "./Func"
import {DirectoryItem, DirectoryItemType} from "./DirectoryItem"
import {FlowModel} from "../FlowModelJSON"
import {Project} from "./Project";

export class MainClazz extends Clazz implements DirectoryItem {

    constructor(type: DirectoryItemType, name: string, flowModels: FlowModel[]) {
        super(type, name, flowModels)
    }

    setMainFunction(mainFunction: Func) {
        this.mainFunction = mainFunction
    }

    generateCode() {
        if (this.mainFunction == null) {
            throw new Error("Main function not defined!")
        }

        const clazzSignature = Project.codeStrategy.getClazzSignature(this)
        if (clazzSignature) {
            this.generatedCode.push(clazzSignature)
            this.generatedCode.push("")
        }

        this.dependencySet.lines.forEach((dependencyLine) => {
            this.generatedCode.push(this.createLineWithSpacing(dependencyLine))
        })

        if (this.dependencySet.lines.length > 0) {
            this.generatedCode.push("")
        }

        this.globalVariableSet.lines.forEach((globalVariableLine) => {
            this.generatedCode.push(this.createLineWithSpacing(globalVariableLine))
        })

        if (this.globalVariableSet.lines.length > 0) {
            this.generatedCode.push("")
        }

        this.mainFunction.code.lines.forEach((codeLine) => {
            this.generatedCode.push(this.createLineWithSpacing(codeLine))
        })

        this.functions.forEach((func) => {
                func.code.lines.forEach((codeLine) => {
                    this.generatedCode.push(this.createLineWithSpacing(codeLine))
                })
            }
        )

        if (clazzSignature) {
            this.generatedCode.push("}")
        }
    }

}
