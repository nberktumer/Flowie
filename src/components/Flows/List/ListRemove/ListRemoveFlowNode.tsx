import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class ListRemoveFlowNode extends BaseFlowNode {
    list: Variable
    index: number

    constructor(list: Variable, index: number, withoutPorts: boolean = false) {
        super(FlowType.LIST_REMOVE, strings.removeFromList + " (" + list.type + ")", NodeColors.LIST_REMOVE)

        this.list = list
        this.index = index
        this.setList(list)
        this.setIndex(index)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    setList(list: Variable) {
        this.list = list
        this.updateInfo()
    }

    setIndex(index: number) {
        this.index = index
        this.updateInfo()
    }

    updateInfo() {
        this.info = `Remove item located at ${this.index} from ${this.list.name}`
    }
}
