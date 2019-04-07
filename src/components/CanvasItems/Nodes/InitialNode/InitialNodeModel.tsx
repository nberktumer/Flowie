import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {RectangleNodeModel} from "../BaseNodes/RectangleNode/RectangleNodeModel"

export class InitialNodeModel extends RectangleNodeModel {

    constructor() {
        super(strings.initialFlow, NodeColors.INITIAL)

        this.addInPort(strings.recurse).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    // Prevent removing this item
    remove(): void {
        return
    }
}
