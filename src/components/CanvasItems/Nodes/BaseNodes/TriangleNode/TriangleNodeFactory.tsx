import * as SRD from "storm-react-diagrams"
import {TriangleNodeWidget} from "./TriangleNodeWidget"
import {TriangleNodeModel} from "./TriangleNodeModel"
import * as React from "react"

export class TriangleNodeFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("triangle")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: TriangleNodeModel): JSX.Element {
        return <TriangleNodeWidget node={node} size={node.size}/>
    }

    getNewInstance() {
        return new TriangleNodeModel()
    }
}
