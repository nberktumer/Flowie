import {BaseInfoFlowNode} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowNode"
import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {FlowType} from "../../../models"

export class IfFlowModel extends BaseInfoFlowNode {
    constructor() {
        super(FlowType.IF, strings.ifStatement, NodeColors.IF)

        this.addInPort("In").setMaximumLinks(Infinity)
        this.addOutPort("True").setMaximumLinks(1)
        this.addOutPort("False").setMaximumLinks(1)
        this.addOutPort("Next Flow").setMaximumLinks(1)
    }

    updateInfo(): void {
        this.info = ""
    }
}
