import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {BaseVariableFlowNode} from "../Base/BaseVariableFlowNode"

export class InputFlowNode extends BaseVariableFlowNode {
    variable: Variable

    constructor(variable: Variable) {
        super(strings.input, NodeColors.IF)

        this.variable = variable
        this.info = variable.name

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }
}
