import * as SRD from "nberktumer-react-diagrams"
import * as React from "react"
import {BaseFlowModel} from "./BaseFlowModel"
import {BaseFlowWidget} from "./BaseFlowWidget"

export class BaseFlowFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("base-flow")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: BaseFlowModel): JSX.Element {
        return <BaseFlowWidget node={node}/>
    }

    getNewInstance() {
        return new BaseFlowModel()
    }
}
