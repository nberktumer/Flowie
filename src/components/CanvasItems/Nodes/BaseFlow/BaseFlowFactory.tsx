import * as SRD from "nberktumer-react-diagrams"
import * as React from "react"
import {BaseFlowNode} from "./BaseFlowNode"
import {BaseFlowWidget} from "./BaseFlowWidget"
import {FlowNodeFactory} from "../../../Flows"

export class BaseFlowFactory extends SRD.AbstractNodeFactory {
    constructor() {
        super("base-flow")
    }

    generateReactWidget(diagramEngine: SRD.DiagramEngine, node: BaseFlowNode): JSX.Element {
        return <BaseFlowWidget node={node}/>
    }

    getNewInstance(node: any) {
        return FlowNodeFactory.load(node)
    }
}
