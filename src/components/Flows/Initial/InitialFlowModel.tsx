import strings from "../../../lang"
import {NodeColors} from "../../../config"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"

export class InitialFlowModel extends BaseFlowModel {

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
