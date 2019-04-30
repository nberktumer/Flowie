import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {BaseVariableFlowNode} from "../Base/BaseVariableFlowNode"
import {FlowType} from "../../../models"

export class InputFlowNode extends BaseVariableFlowNode {
    constructor(variable: Variable, withoutPorts: boolean = false) {
        super(FlowType.INPUT, strings.input, NodeColors.IF)

        this.setVariable(variable)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(Infinity)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    setVariable(variable: Variable) {
        super.setVariable(variable)
        this.info = variable.name
    }
}
