import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Condition} from "../../../models/Condition"
import {IfFlowNode} from "./IfFlowNode"

export class IfFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: IfFlowNode): BaseFlowNode | undefined {
        if (!data || !data.conditions || !data.conditionType)
            return undefined

        const resultNode = node ? node : new IfFlowNode()
        resultNode.removeAllConditions()
        resultNode.setConditionType(data.conditionType)

        for (const conditionData of data.conditions) {

            if (!conditionData.variableType || !conditionData.first || !conditionData.second || !conditionData.operation)
                continue

            const condition = new Condition(conditionData.variableType, JSON.parse(conditionData.first), JSON.parse(conditionData.second), conditionData.operation)

            if (!condition.second || (!condition.second.name && !condition.second.value))
                return undefined

            resultNode.addCondition(condition)
        }

        return resultNode
    }

    load = (node: any): BaseFlowNode => new IfFlowNode(true)
}
