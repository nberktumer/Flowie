import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {BaseVariableFlowNode} from "../Base/BaseVariableFlowNode"
import {FlowType} from "../../../models"

export class AssignmentFlowNode extends BaseVariableFlowNode {

    constructor(variable: Variable) {
        super(FlowType.ASSIGNMENT, strings.variable + " (" + variable.type + ")", NodeColors.VARIABLE)

        this.setVariable(variable)

        this.addInPort(strings.in).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    setVariable(variable: Variable) {
        super.setVariable(variable)
        this.info = `${variable.name} = ${variable.value}`
    }
}
