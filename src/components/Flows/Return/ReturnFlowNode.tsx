import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {Variable} from "../../../models/Variable"
import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"

export class ReturnFlowNode extends BaseFlowNode {
    private variable?: Variable

    constructor(variable?: Variable, withoutPorts: boolean = false) {
        super(FlowType.RETURN, strings.return, NodeColors.RETURN)

        this.setVariable(variable)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
        }
    }

    updateInfo() {
        if (this.variable)
            this.info = `${strings.return} ${this.variable.name ? this.variable.name : this.variable.value}`
        else
            this.info = strings.return
    }

    setVariable(variable?: Variable) {
        this.variable = variable
        this.updateInfo()
    }

    getVariable(): Variable | undefined {
        return this.variable
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
