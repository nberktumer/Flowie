import * as _ from "lodash"
import {DefaultLinkModel, DiagramEngine, LinkModel} from "storm-react-diagrams"
import {SingleConnectionPort} from "../../../Ports/SingleConnectionPort/SingleConnectionPort"

export class TrianglePortModel extends SingleConnectionPort {
    position: string | "top" | "bottom" | "left"

    constructor(pos: string = "left", isInput: boolean = true, label: string = "undefined") {
        super(isInput, label)
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
