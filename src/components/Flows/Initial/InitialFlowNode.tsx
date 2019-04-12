import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export class InitialFlowNode extends BaseFlowNode {

    constructor() {
        super(strings.initialFlow, NodeColors.INITIAL)

        this.addLoopPort(strings.recurse).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    // Prevent removing this item
    remove(): void {
        return
    }
}
