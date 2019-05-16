import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {BaseVariableFlowNode} from "../Base/BaseVariableFlowNode"
import {FlowType} from "../../../models"

export class CurrentTimeFlowNode extends BaseVariableFlowNode {

    constructor(variable: Variable, withoutPorts: boolean = false) {
        super(FlowType.CURRENT_TIME, strings.variable + " (" + strings.currentTime + ")", NodeColors.CURRENT_TIME)

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

    updateInfo(): void {
        this.info = `${this.getVariable().name} = ${strings.currentTime}`
    }
}
