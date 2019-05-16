import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {ReturnFlowNode} from "./ReturnFlowNode"

export class ReturnFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ReturnFlowNode): BaseFlowNode | undefined {
        if (data && data.variable) {
            if (node) {
                node.setVariable(JSON.parse(data.variable))
                return node
            } else {
                return new ReturnFlowNode(JSON.parse(data.variable))
            }
        } else {
            return new ReturnFlowNode()
        }
    }

    load(node: any): BaseFlowNode {
        return new ReturnFlowNode(node.variable, true)
    }
}
