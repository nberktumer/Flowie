import {RectangleNodeWithInfoModel} from "../BaseNodes/RectangleNode/RectangleNodeWithInfo/RectangleNodeWithInfoModel"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {DiagramEngine} from "storm-react-diagrams"
import * as _ from "lodash"
import {Variable} from "../../../../models/Variable"

export class OutputNodeModel extends RectangleNodeWithInfoModel {
    variable: Variable

    constructor(variable: Variable) {
        super(strings.output, NodeColors.IF)

        this.variable = variable

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.variable = object.variable
    }

    serialize() {
        return _.merge(super.serialize(), {
            variable: this.variable
        })
    }
}
