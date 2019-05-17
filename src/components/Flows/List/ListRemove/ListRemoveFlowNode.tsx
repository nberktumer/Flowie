import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

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

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.list = object.list
        this.index = object.index
    }

    serialize() {
        return _.merge(super.serialize(), {
            list: this.list,
            index: this.index
        })
    }
}
