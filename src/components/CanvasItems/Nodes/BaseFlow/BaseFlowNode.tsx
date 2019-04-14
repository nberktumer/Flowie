import {DiagramEngine, NodeModel} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Random} from "../../../../utils"
import {DefaultPort, DefaultPortLocation, DefaultPortModel, DefaultPortType} from "../../Ports/DefaultPort"
import {FlowType} from "../../../../models"

export class BaseFlowNode extends NodeModel {
    name: string
    color: string
    ports: { [s: string]: DefaultPortModel }
    onLinkChangedListener: () => void
    flowType: FlowType | undefined

    constructor(flowType?: FlowType, name: string = "Untitled", color: string = "rgb(0,192,255)", nodeType: string = "base-flow") {
        super(nodeType)
        this.name = name
        this.color = color
        this.ports = {}
        this.onLinkChangedListener = () => {
        }
        this.flowType = flowType
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

    getPortListByType(...type: DefaultPortType[]): DefaultPortModel[] {
        return _.filter(this.ports, (portModel) => {
            return _.includes(type, portModel.portType.type)
        })
    }

    getPortListByLocation(...location: DefaultPortLocation[]): DefaultPortModel[] {
        return _.filter(this.ports, (portModel) => {
            return _.includes(location, portModel.portType.location)
        })
    }

    getNextFlow(): BaseFlowNode | null {
        const links = Object.values(this.getPortListByType(DefaultPortType.OUT)[0].getLinks())

        if (links.length > 0) {
            return links[0].getTargetPort().getNode() as BaseFlowNode
        } else {
            return null
        }
    }
}
