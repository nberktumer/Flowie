import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class ListClearFlowNode extends BaseFlowNode {
    list: Variable

    constructor(list: Variable, withoutPorts: boolean = false) {
        super(FlowType.LIST_CLEAR, strings.clearList + " (" + list.type + ")", NodeColors.LIST_CLEAR)

        this.list = list
        this.setList(list)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    setList(list: Variable) {
        this.list = list
        this.updateInfo()
    }

    updateInfo() {
        this.info = `Clear ${this.list.name}`
    }
}
