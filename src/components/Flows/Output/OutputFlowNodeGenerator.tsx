import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {OutputFlowNode} from "./OutputFlowNode"

export class OutputFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: OutputFlowNode): BaseFlowNode | null {
        if (!data || data.variable === "")
            return null

        if (node !== undefined) {
            node.setVariable(JSON.parse(data.variable))
            return node
        } else {
            return new OutputFlowNode(JSON.parse(data.variable))
        }
    }

    load(node: any): BaseFlowNode {
        return new OutputFlowNode(node.variable, true)
    }
}
