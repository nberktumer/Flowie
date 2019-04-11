import {BaseInfoFlowModel} from "../../CanvasItems/Nodes/BaseInfoFlow/BaseInfoFlowModel"
import strings from "../../../lang"
import {NodeColors} from "../../../config"

export class IfFlowModel extends BaseInfoFlowModel {
    constructor() {
        super(strings.ifStatement, NodeColors.IF)

        this.addInPort("In").setMaximumLinks(Infinity)
        this.addOutPort("True").setMaximumLinks(1)
        this.addOutPort("False").setMaximumLinks(1)
        this.addOutPort("Next Flow").setMaximumLinks(1)
    }
}
