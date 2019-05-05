import * as _ from "lodash"
import {BaseEvent, DefaultLinkModel, DiagramEngine, LinkModel, PortModel} from "nberktumer-react-diagrams"
import {DefaultPort, DefaultPortType} from "./index"

export class DefaultPortModel extends PortModel {
    portType: DefaultPort
    label: string
    onLinkChangedListener: () => void

    constructor(portType: DefaultPort, name: string, label: string | null = null, id?: string) {
        super(name, "default", id)
        this.portType = portType
        this.label = label || name
        this.onLinkChangedListener = () => {
        }
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.portType = object.portType
        this.label = object.label
    }

    serialize() {
        return _.merge(super.serialize(), {
            portType: this.portType,
            label: this.label
        })
    }

    link(port: PortModel): LinkModel {
        const link = this.createLinkModel()
        link.setSourcePort(this)
        link.setTargetPort(port)
        return link
    }

    getMaximumLinks(): number {
        return !this.maximumLinks ? Infinity : this.maximumLinks
    }

    canLinkToPort(port: DefaultPortModel): boolean {
        if (Object.keys(port.getLinks()).length > port.getMaximumLinks() || Object.keys(this.getLinks()).length > this.getMaximumLinks())
            return false

        // Do not connect ports that are in the same node
        if (port.getNode() === this.getNode())
            return false

        return (this.portType.type === DefaultPortType.OUT && port.portType.type === DefaultPortType.IN)
            || (this.portType.type === DefaultPortType.OUT && port.portType.type === DefaultPortType.LOOP)
            || (this.portType.type === DefaultPortType.SCOPE && port.portType.type === DefaultPortType.IN)
            || (this.portType.type === DefaultPortType.TRUE_SCOPE && port.portType.type === DefaultPortType.IN)
            || (this.portType.type === DefaultPortType.FALSE_SCOPE && port.portType.type === DefaultPortType.IN)
    }

    addOnLinkChangedListener(listener: () => void) {
        this.onLinkChangedListener = listener

        _.forEach(this.getLinks(), (link: LinkModel) => {
            link.addListener({
                targetPortChanged: this.targetPortChangedListener,
                entityRemoved: this.entityRemovedListener
            })
        })
    }

    createLinkModel(): LinkModel {
        const link = new DefaultLinkModel()
        link.addListener({
            targetPortChanged: this.targetPortChangedListener,
            entityRemoved: this.entityRemovedListener
        })
        return link
    }

    private targetPortChangedListener = (event: BaseEvent<LinkModel> & { port: PortModel | null }) => {
        const link = event.entity as DefaultLinkModel
        if (!event.port != null && event.port instanceof DefaultPortModel && link.sourcePort != null && link.sourcePort.canLinkToPort(event.port)) {
            (event.port as DefaultPortModel).onLinkChangedListener()
        }
    }

    private entityRemovedListener = (event: BaseEvent<LinkModel> & { port: PortModel | null }) => {
        const link = event.entity as DefaultLinkModel
        if (link.getTargetPort() != null)
            (link.getTargetPort() as DefaultPortModel).onLinkChangedListener()
    }
}
