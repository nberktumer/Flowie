import {BaseInfoFlowNode} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowNode"
import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Variable} from "../../../models/Variable"
import {FlowType} from "../../../models"

export class OutputFlowNode extends BaseInfoFlowNode {
    constructor(variable: Variable) {
        super(FlowType.OUTPUT, strings.output, NodeColors.IF)

        this._variable = variable
        this.info = variable.name

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    private _variable: Variable

    get variable() {
        return this.variable
    }

    set variable(variable: Variable) {
        this._variable = variable
        this.info = variable.name
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
