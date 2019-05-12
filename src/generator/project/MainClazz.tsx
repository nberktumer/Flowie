import {Clazz} from "./Clazz"
import {Func} from "./Func"
import {DirectoryItemType} from "./DirectoryItem"
import {FlowModel} from "../FlowModelJSON"

export class MainClazz extends Clazz {

    constructor(name: string, flowModels: FlowModel[]) {
        super(name, flowModels)
        this.type = DirectoryItemType.MAIN_CLASS
    }

    setMainFunction(mainFunction: Func) {
        this.mainFunction = mainFunction
    }

    generateCode() {
        if (this.mainFunction == null) {
            throw new Error("Main function not defined!")
        }

        this.dependencySet.lines.forEach((dependencyLine) => {
            this.generatedCode.push(this.createLineWithSpacing(dependencyLine))
        })

        this.globalVariableSet.lines.forEach((globalVariableLine) => {
            this.generatedCode.push(this.createLineWithSpacing(globalVariableLine))
        })

        this.mainFunction.code.lines.forEach((codeLine) => {
            this.generatedCode.push(this.createLineWithSpacing(codeLine))
        })

        this.functions.forEach((func) => {
                func.code.lines.forEach((codeLine) => {
                    this.generatedCode.push(this.createLineWithSpacing(codeLine))
                })
            }
        )
    }

}
