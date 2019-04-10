import * as SRD from "nberktumer-react-diagrams"
import * as React from "react"
import {RectangleNodeWithInfoModel} from "./RectangleNodeWithInfoModel"
import {RectangleNodeWithInfoWidget} from "./RectangleNodeWithInfoWidget"

export class RectangleNodeWithInfoFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("rectangle-node-with-info")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: RectangleNodeWithInfoModel): JSX.Element {
        return <RectangleNodeWithInfoWidget node={node}/>
    }

    getNewInstance() {
        return new RectangleNodeWithInfoModel()
    }
}
