import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Condition} from "../../../models/Condition"
import {WhileFlowNode} from "./WhileFlowNode"

export class WhileFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: WhileFlowNode): BaseFlowNode | null {
        if (!data || data.variableType === "" || data.first === "" || data.second === "" || data.operation === "")
            return null

        const condition = new Condition(data.variableType, JSON.parse(data.first), JSON.parse(data.second), data.operation)

        if (node !== undefined) {
            node.removeAllConditions()
            node.addCondition(condition)
            return node
        } else {
            const whileNode = new WhileFlowNode()
            whileNode.addCondition(condition)
            return whileNode
        }
    }

    load(node: any): BaseFlowNode {
        return new WhileFlowNode(true)
    }
}
