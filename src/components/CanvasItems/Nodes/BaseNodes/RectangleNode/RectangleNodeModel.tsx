import {DiagramEngine, NodeModel} from "storm-react-diagrams"
import * as _ from "lodash"
import {SingleConnectionPort} from "../../../Ports/SingleConnectionPort/SingleConnectionPort"
import {Random} from "../../../../../utils"

export class RectangleNodeModel extends NodeModel {
    name: string
    color: string
    ports: { [s: string]: SingleConnectionPort }

    constructor(name: string = "Untitled", color: string = "rgb(0,192,255)", nodeType: string = "rectangle-node") {
        super(nodeType)
        this.name = name
        this.color = color
        this.ports = {}
    }

    addInPort(label: string): SingleConnectionPort {
        return this.addPort(new SingleConnectionPort(true, Random.UID(), label))
    }

    addOutPort(label: string): SingleConnectionPort {
        return this.addPort(new SingleConnectionPort(false, Random.UID(), label))
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.name = object.name
        this.color = object.color
    }

    serialize() {
        return _.merge(super.serialize(), {
            name: this.name,
            color: this.color
        })
    }

    getInPorts(): SingleConnectionPort[] {
        return _.filter(this.ports, (portModel) => {
            return portModel.in
        })
    }

    getOutPorts(): SingleConnectionPort[] {
        return _.filter(this.ports, (portModel) => {
            return !portModel.in
        })
    }
}
