import {Clazz} from "./Clazz"
import {Func} from "./Func"
import {DirectoryItem, DirectoryItemType} from "./DirectoryItem"
import {FlowModel} from "../FlowModelJSON"
import {VariableType} from "../../models"

export class MainClazz extends Clazz implements DirectoryItem {

    constructor(type: DirectoryItemType, name: string, flowModels: FlowModel[]) {
        super([], VariableType.MAIN_ARG, type, name, flowModels)
    }

    setMainFunction(mainFunction: Func) {
        this.mainFunction = mainFunction
    }

}
