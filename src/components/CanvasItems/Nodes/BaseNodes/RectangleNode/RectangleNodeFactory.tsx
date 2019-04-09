import * as SRD from "nberktumer-react-diagrams"
import * as React from "react"
import {RectangleNodeModel} from "./RectangleNodeModel"
import {RectangleNodeWidget} from "./RectangleNodeWidget"

export class RectangleNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("rectangle-node")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: RectangleNodeModel): JSX.Element {
        return <RectangleNodeWidget node={node}/>
    }

    getNewInstance() {
        return new RectangleNodeModel()
    }
}
