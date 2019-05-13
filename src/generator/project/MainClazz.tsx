import {Clazz} from "./Clazz"
import {Func} from "./Func"
import {DirectoryItem, DirectoryItemType} from "./DirectoryItem"
import {FlowModel} from "../FlowModelJSON"

export class MainClazz extends Clazz implements DirectoryItem {

    constructor(type: DirectoryItemType, name: string, flowModels: FlowModel[]) {
        super(type, name, flowModels)
    }

    setMainFunction(mainFunction: Func) {
        this.mainFunction = mainFunction
    }

}
