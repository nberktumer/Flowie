import {DiagramEngine, NodeModel, PortModel} from "nberktumer-react-diagrams"
import * as _ from "lodash"
import {Random} from "../../../../utils"
import {DefaultPort, DefaultPortLocation, DefaultPortModel, DefaultPortType} from "../../Ports/DefaultPort"
import {FlowType} from "../../../../models"
import {BasePropertiesState} from "../../../Flows/Base/BaseProperties"
import {FlowNodeFactory} from "../../../Flows"

export class BaseFlowNode extends NodeModel {
    name: string
    color: string
    onLinkChangedListener: () => void
    flowType: FlowType | undefined

    constructor(flowType?: FlowType, name: string = "Untitled", color: string = "rgb(0,192,255)", nodeType: string = "base-flow") {
        super(nodeType)
        this.name = name
        this.color = color
        this.onLinkChangedListener = () => {
        }
        this.flowType = flowType
    }

    updateNode(data: BasePropertiesState) {
        FlowNodeFactory.update(this, data)
    }

    addOnLinkChangedListener(listener: () => void) {
        this.onLinkChangedListener = listener

        _.map(this.ports, (portModel: DefaultPortModel) => {
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

    addTrueScopePort(label: string): DefaultPortModel {
        const port = new DefaultPortModel(new DefaultPort(DefaultPortType.TRUE_SCOPE, DefaultPortLocation.RIGHT), Random.UID(), label)
        port.addOnLinkChangedListener(this.onLinkChangedListener)
        return this.addPort(port)
    }

    addFalseScopePort(label: string): DefaultPortModel {
        const port = new DefaultPortModel(new DefaultPort(DefaultPortType.FALSE_SCOPE, DefaultPortLocation.RIGHT), Random.UID(), label)
        port.addOnLinkChangedListener(this.onLinkChangedListener)
        return this.addPort(port)
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.flowType = object.flowType
    }

    serialize() {
        return _.merge(super.serialize(), {
            flowType: this.flowType
        })
    }

    getPortListByType(...type: DefaultPortType[]): PortModel[] {
        return _.filter(this.ports, (portModel: any) => {
            return _.includes(type, portModel.portType.type)
        })
    }

    getPortListByLocation(...location: DefaultPortLocation[]): PortModel[] {
        return _.filter(this.ports, (portModel: any) => {
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
