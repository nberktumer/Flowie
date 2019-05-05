import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"

export class InitialFlowNode extends BaseFlowNode {

    constructor(withoutPorts: boolean = false) {
        super(FlowType.INITIAL, strings.initialFlow, NodeColors.INITIAL)

        if (!withoutPorts) {
            this.addLoopPort(strings.recurse).setMaximumLinks(Infinity)
            this.addOutPort(strings.out).setMaximumLinks(1)
        }
    }

    // Prevent removing this item
    remove(): void {
        return
    }
}
