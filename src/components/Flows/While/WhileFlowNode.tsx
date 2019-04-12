import {BaseInfoFlowNode} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowNode"
import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Condition} from "../../../models/Condition"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {DefaultPortType} from "../../CanvasItems/Ports/DefaultPort"

export class WhileFlowNode extends BaseInfoFlowNode {
    conditionList: Condition[] = []

    constructor() {
        super(strings.while, NodeColors.WHILE)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
        this.addScopePort(strings.scope).setMaximumLinks(1)
    }

    addCondition(condition: Condition) {
        this.conditionList.push(condition)

        this.info = this.conditionList.map((condition) => {
            return `${condition.first.name} ${condition.operation} ${condition.second.name}`
        }).join("\n")
    }

    removeCondition(condition: Condition) {
        this.conditionList = this.conditionList.filter((cond) => cond != condition)

        this.info = this.conditionList.map((condition) => {
            return `${condition.first.name} ${condition.operation} ${condition.second.name}`
        }).join("\n")
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.conditionList = object.conditionList
    }

    serialize() {
        return _.merge(super.serialize(), {
            conditionList: this.conditionList
        })
    }

    getScopeFlow(): BaseFlowNode | null {
        const links = Object.values(this.getPortListByType(DefaultPortType.SCOPE)[0].getLinks())

        if (links.length > 0) {
            return links[0].getTargetPort().getNode() as BaseFlowNode
        } else {
            return null
        }
    }
}
