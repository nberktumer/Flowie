import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {BaseVariableFlowNode} from "../Base/BaseVariableFlowNode"

export class AssignmentFlowNode extends BaseVariableFlowNode {
    variable: Variable

    constructor(variable: Variable) {
        super(strings.variable + " (" + variable.type + ")", NodeColors.VARIABLE)

        this.variable = variable
        this.info = `${variable.name} = ${variable.value}`

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }
}
