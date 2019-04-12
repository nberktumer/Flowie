import * as SRD from "nberktumer-react-diagrams"
import * as React from "react"
import {BaseInfoFlowNode} from "./BaseInfoFlowNode"
import {BaseInfoFlowWidget} from "./BaseInfoFlowWidget"

export class BaseInfoFlowFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("base-info-flow")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: BaseInfoFlowNode): JSX.Element {
        return <BaseInfoFlowWidget node={node}/>
    }

    getNewInstance() {
        return new BaseInfoFlowNode()
    }
}
