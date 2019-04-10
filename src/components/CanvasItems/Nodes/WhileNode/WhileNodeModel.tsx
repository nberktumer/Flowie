import {RectangleNodeWithInfoModel} from "../BaseNodes/RectangleNode/RectangleNodeWithInfo/RectangleNodeWithInfoModel"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Condition} from "../../../../models/Condition"
import {RectangleNodeModel} from "../BaseNodes/RectangleNode/RectangleNodeModel"
import {DefaultPortType} from "../../Ports/DefaultPort"

export class WhileNodeModel extends RectangleNodeWithInfoModel {
    conditionList: Condition[] = []

    constructor() {
        super(strings.while, NodeColors.WHILE)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addLoopPort(strings.loop).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
        this.addScopePort(strings.scope).setMaximumLinks(1)
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

    getScopeFlow(): RectangleNodeModel | null {
        const links = Object.values(this.getPortListByType(DefaultPortType.SCOPE)[0].getLinks())

        if (links.length > 0) {
            return links[0].getTargetPort().getNode() as RectangleNodeModel
        } else {
            return null
        }
    }
}
