import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class ListUpdateFlowNode extends BaseFlowNode {
    list: Variable
    variable: Variable
    index: number

    constructor(list: Variable, variable: Variable, index: number, withoutPorts: boolean = false) {
        super(FlowType.LIST_UPDATE, strings.updateListItem + " (" + list.type + ")", NodeColors.LIST_UPDATE)

        this.list = list
        this.variable = variable
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

    setVariable(variable: Variable) {
        this.variable = variable
        this.updateInfo()
    }

    setIndex(index: number) {
        this.index = index
        this.updateInfo()
    }

    updateInfo() {
        this.info = `Replace item located in ${this.index} with ${this.variable.name ? this.variable.name : this.variable.value} in ${this.list.name}`
    }
}
