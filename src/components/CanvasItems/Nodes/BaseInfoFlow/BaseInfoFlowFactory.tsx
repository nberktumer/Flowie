import * as SRD from "nberktumer-react-diagrams"
import * as React from "react"
import {BaseInfoFlowModel} from "./BaseInfoFlowModel"
import {BaseInfoFlowWidget} from "./BaseInfoFlowWidget"

export class BaseInfoFlowFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("base-info-flow")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: BaseInfoFlowModel): JSX.Element {
        return <BaseInfoFlowWidget node={node}/>
    }

    getNewInstance() {
        return new BaseInfoFlowModel()
    }
}
