import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {CurrentTimeFlowNode} from "./CurrentTimeFlowNode"

export class CurrentTimeFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: CurrentTimeFlowNode): BaseFlowNode | undefined {
        if (!data || !data.variable)
            return undefined

        const variable = JSON.parse(data.variable) as Variable

        if (node) {
            node.setVariable(variable)
            return node
        } else {
            return new CurrentTimeFlowNode(variable)
        }
    }

    load(node: any): BaseFlowNode {
        return new CurrentTimeFlowNode(node.variable, true)
    }
}
