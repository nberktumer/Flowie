import {DiagramEngine, NodeModel} from "storm-react-diagrams"
import * as _ from "lodash"
import {Random} from "../../../../../utils"
import {DefaultPort, DefaultPortLocation, DefaultPortModel, DefaultPortType} from "../../../Ports/DefaultPort"

export class RectangleNodeModel extends NodeModel {
    name: string
    color: string
    ports: { [s: string]: DefaultPortModel }

    constructor(name: string = "Untitled", color: string = "rgb(0,192,255)", nodeType: string = "rectangle-node") {
        super(nodeType)
        this.name = name
        this.color = color
        this.ports = {}
    }

    addInPort(label: string): DefaultPortModel {
        return this.addPort(new DefaultPortModel(new DefaultPort(DefaultPortType.IN, DefaultPortLocation.LEFT), Random.UID(), label))
    }

    addOutPort(label: string): DefaultPortModel {
        return this.addPort(new DefaultPortModel(new DefaultPort(DefaultPortType.OUT, DefaultPortLocation.RIGHT), Random.UID(), label))
    }

    addLoopPort(label: string): DefaultPortModel {
        return this.addPort(new DefaultPortModel(new DefaultPort(DefaultPortType.LOOP, DefaultPortLocation.LEFT), Random.UID(), label))
    }

    addScopePort(label: string): DefaultPortModel {
        return this.addPort(new DefaultPortModel(new DefaultPort(DefaultPortType.SCOPE, DefaultPortLocation.RIGHT), Random.UID(), label))
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

    getInPorts(): DefaultPortModel[] {
        return _.filter(this.ports, (portModel) => {
            return portModel.portType.type === DefaultPortType.IN
        })
    }

    getOutPorts(): DefaultPortModel[] {
        return _.filter(this.ports, (portModel) => {
            return portModel.portType.type === DefaultPortType.OUT
        })
    }

    getLoopPorts(): DefaultPortModel[] {
        return _.filter(this.ports, (portModel) => {
            return portModel.portType.type === DefaultPortType.LOOP
        })
    }

    getScopePorts(): DefaultPortModel[] {
        return _.filter(this.ports, (portModel) => {
            return portModel.portType.type === DefaultPortType.SCOPE
        })
    }
}
