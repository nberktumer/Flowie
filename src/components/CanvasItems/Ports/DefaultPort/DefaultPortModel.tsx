import * as _ from "lodash"
import {DefaultLinkModel, DiagramEngine, LinkModel, PortModel} from "storm-react-diagrams"
import {DefaultPortType} from "./DefaultPortType"

export class DefaultPortModel extends PortModel {
    portType: DefaultPortType
    label: string
    links: { [id: string]: DefaultLinkModel }

    constructor(portType: DefaultPortType, name: string, label: string | null = null, id?: string) {
        super(name, "default", id)
        this.portType = portType
        this.label = label || name
        this.links = {}
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

    canLinkToPort(port: DefaultPortModel): boolean {
        if (Object.keys(port.getLinks()).length > port.getMaximumLinks() || Object.keys(this.getLinks()).length > port.getMaximumLinks())
            return false

        // Do not connect ports that are in the same node
        if (port.getNode() === this.getNode())
            return false

        if (this.portType !== DefaultPortType.OUT)
            return false

        return port.portType === DefaultPortType.IN || port.portType === DefaultPortType.LOOP
    }

    createLinkModel(): LinkModel {
        const link = super.createLinkModel()
        return link || new DefaultLinkModel()
    }
}
