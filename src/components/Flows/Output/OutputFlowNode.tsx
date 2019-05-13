import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Variable} from "../../../models/Variable"
import {FlowType} from "../../../models"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class OutputFlowNode extends BaseFlowNode {
    private variable: Variable

    constructor(variable: Variable, withoutPorts: boolean = false) {
        super(FlowType.OUTPUT, strings.output, NodeColors.IF)

        this.variable = variable
        this.setVariable(variable)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    getVariable() {
        return this.variable
    }

    setVariable(variable: Variable) {
        this.variable = variable
        this.updateInfo()
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

    updateInfo(): void {
        this.info = this.getVariable().name ? this.getVariable().name : this.getVariable().value
    }
}
