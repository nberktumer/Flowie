import {Variable} from "../../../../models/Variable"
import {FlowType} from "../../../../models"
import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {BaseVariableFlowNode} from "../../Base/BaseVariableFlowNode"

export class NewListFlowNode extends BaseVariableFlowNode {

    constructor(variable: Variable, withoutPorts: boolean = false) {
        super(FlowType.LIST_NEW, strings.list + " (" + variable.type + ")", NodeColors.LIST_NEW)

        this.setVariable(variable)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    setVariable(variable: Variable) {
        super.setVariable(variable)
        this.updateInfo()
    }

    updateInfo() {
        this.info = `${this.getVariable().name} = List<${this.getVariable().listElementType}>`
    }
}
