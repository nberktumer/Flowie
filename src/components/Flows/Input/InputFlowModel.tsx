import {BaseInfoFlowModel} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowModel"
import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Variable} from "../../../models/Variable"

export class InputFlowModel extends BaseInfoFlowModel {
    variable: Variable

    constructor(variable: Variable) {
        super(strings.input, NodeColors.IF)

        this.variable = variable
        this.info = variable.name

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
