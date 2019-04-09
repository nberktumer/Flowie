import {DiagramEngine, NodeModel} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Random} from "../../../../../utils"
import {DefaultPort, DefaultPortLocation, DefaultPortModel, DefaultPortType} from "../../../Ports/DefaultPort"
import strings from "../../../../../lang"

export class RectangleNodeModel extends NodeModel {
    name: string
    color: string
    ports: { [s: string]: DefaultPortModel }
    onLinkChangedListener: () => void

    constructor(name: string = "Untitled", color: string = "rgb(0,192,255)", nodeType: string = "rectangle-node") {
        super(nodeType)
        this.name = name
        this.color = color
        this.ports = {}
        this.onLinkChangedListener = () => {
        }
    }

    addOnLinkChangedListener(listener: () => void) {
        this.onLinkChangedListener = listener

        _.map(this.ports, (portModel) => {
            portModel.addOnLinkChangedListener(listener)
        })
    }

    addInPort(label: string): DefaultPortModel {
        const port = new DefaultPortModel(new DefaultPort(DefaultPortType.IN, DefaultPortLocation.LEFT), Random.UID(), label)
        port.addOnLinkChangedListener(this.onLinkChangedListener)
        return this.addPort(port)
    }

    addOutPort(label: string): DefaultPortModel {
        const port = new DefaultPortModel(new DefaultPort(DefaultPortType.OUT, DefaultPortLocation.RIGHT), Random.UID(), label)
        port.addOnLinkChangedListener(this.onLinkChangedListener)
        return this.addPort(port)
    }

    addLoopPort(label: string): DefaultPortModel {
        const port = new DefaultPortModel(new DefaultPort(DefaultPortType.LOOP, DefaultPortLocation.LEFT), Random.UID(), label)
        port.addOnLinkChangedListener(this.onLinkChangedListener)
        return this.addPort(port)
    }

    addScopePort(label: string): DefaultPortModel {
        const port = new DefaultPortModel(new DefaultPort(DefaultPortType.SCOPE, DefaultPortLocation.RIGHT), Random.UID(), label)
        port.addOnLinkChangedListener(this.onLinkChangedListener)
        return this.addPort(port)
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

    getNextFlow(): RectangleNodeModel | null {
        const links = Object.values(this.getOutPorts().filter((value) => {
            return value.label === strings.out
        })[0].getLinks())

        if (links.length > 0) {
            return links[0].getTargetPort().getNode() as RectangleNodeModel
        } else {
            return null
        }
    }
}
