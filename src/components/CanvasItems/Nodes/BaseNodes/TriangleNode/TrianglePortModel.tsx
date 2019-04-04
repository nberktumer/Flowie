import * as _ from "lodash"
import {DefaultLinkModel, DiagramEngine, LinkModel} from "storm-react-diagrams"
import {DefaultPortModel, DefaultPortType} from "../../../Ports/DefaultPort"

export class TrianglePortModel extends DefaultPortModel {
    position: string | "top" | "bottom" | "left"

    constructor(pos: string = "left", portType: DefaultPortType = DefaultPortType.OUT, label: string = "undefined") {
        super(portType, label)
        this.position = pos
    }

    serialize() {
        return _.merge(super.serialize(), {
            position: this.position
        })
    }

    deSerialize(data: any, engine: DiagramEngine) {
        super.deSerialize(data, engine)
        this.position = data.position
    }

    createLinkModel(): LinkModel {
        return new DefaultLinkModel()
    }
}
