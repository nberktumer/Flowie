import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

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

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.list = object.list
        this.variable = object.variable
        this.index = object.index
    }

    serialize() {
        return _.merge(super.serialize(), {
            list: this.list,
            variable: this.variable,
            index: this.index
        })
    }
}
