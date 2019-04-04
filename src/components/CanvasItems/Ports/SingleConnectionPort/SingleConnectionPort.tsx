import {DefaultLinkModel, DiagramEngine, LinkModel, PortModel} from "storm-react-diagrams"
import * as _ from "lodash"

export class SingleConnectionPort extends PortModel {
    in: boolean
    label: string
    links: { [id: string]: DefaultLinkModel }

    constructor(isInput: boolean, name: string, label: string | null = null, id?: string) {
        super(name, "single", id)
        this.in = isInput
        this.label = label || name
        this.links = {}
    }

    deSerialize(object: any, engine: DiagramEngine) {
        super.deSerialize(object, engine)
        this.in = object.in
        this.label = object.label
    }

    serialize() {
        return _.merge(super.serialize(), {
            in: this.in,
            label: this.label
        })
    }

    link(port: PortModel): LinkModel {
        const link = this.createLinkModel()
        link.setSourcePort(this)
        link.setTargetPort(port)
        return link
    }

    canLinkToPort(port: PortModel): boolean {
        if (Object.keys(port.getLinks()).length > port.getMaximumLinks() || Object.keys(this.getLinks()).length > port.getMaximumLinks())
            return false

        // Do not connect ports that are in the same node
        if (port.getNode() === this.getNode())
            return false

        if (port instanceof SingleConnectionPort) {
            return this.in !== port.in
        }
        return true
    }

    createLinkModel(): LinkModel {
        console.log("asdasda")
        const link = super.createLinkModel()
        return link || new DefaultLinkModel()
    }
}
