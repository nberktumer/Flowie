import {DiagramEngine} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {BaseFlowNode} from "../BaseFlow/BaseFlowNode"

export class BaseInfoFlowNode extends BaseFlowNode {
    info: string | undefined

    constructor(name: string = "Untitled", color: string = "rgb(0,192,255)") {
        super(name, color, "base-info-flow")
        this.info = ""
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.info = object.info
    }

    serialize() {
        return _.merge(super.serialize(), {
            info: this.info
        })
    }
}
