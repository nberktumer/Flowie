import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

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

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.list = object.list
    }

    serialize() {
        return _.merge(super.serialize(), {
            list: this.list
        })
    }
}
