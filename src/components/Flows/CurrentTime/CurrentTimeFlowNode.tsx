import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {Variable} from "../../../models/Variable"
import {FlowType} from "../../../models"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class CurrentTimeFlowNode extends BaseFlowNode {
    private variable: Variable
    isNewVariable: boolean

    constructor(variable: Variable, isNewVariable: boolean, withoutPorts: boolean = false) {
        super(FlowType.CURRENT_TIME, strings.variable + " (" + strings.currentTime + ")", NodeColors.CURRENT_TIME)

        this.isNewVariable = isNewVariable
        this.variable = variable
        this.setVariable(variable)

        if (!withoutPorts) {
            this.addInPort(strings.in).setMaximumLinks(1)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    getVariable(): Variable {
        return this.variable
    }

    setVariable(variable: Variable) {
        this.variable = variable
        this.updateInfo()
    }

    updateInfo(): void {
        this.info = `${this.variable.name} = ${strings.currentTime}`
    }
}
