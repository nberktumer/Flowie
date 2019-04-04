import strings from "../../../../lang"
import {NodeColors} from "../../../../config"
import {LinkModel, LinkModelListener} from "storm-react-diagrams"
import {RectangleNodeModel} from "../BaseNodes/RectangleNode/RectangleNodeModel"

export class InitialNode extends RectangleNodeModel {

    constructor() {
        super(strings.initialFlow, NodeColors.INITIAL)

        this.addInPort(strings.recurse).setMaximumLinks(Infinity)
        this.addOutPort(strings.out).setMaximumLinks(1)
    }

    getNextFlowId() {
        if (Object.keys(this.getOutPorts()[0].getLinks()).length > 0) {
            Object.values(this.getOutPorts()[0].getLinks()).map((value: LinkModel<LinkModelListener>) => {
                value.getTargetPort()
            })
        }
        return this.getOutPorts()
    }
}
