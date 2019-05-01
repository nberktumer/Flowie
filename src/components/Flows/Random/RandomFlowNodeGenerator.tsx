import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {RandomFlowNode} from "./RandomFlowNode"
import {VariableType} from "../../../models"

export class RandomFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: RandomFlowNode): BaseFlowNode | null {
        console.log(data)
        if (!data || data.variableName === "" || data.minValue === "" || data.maxValue === "" || data.minValue > data.maxValue)
            return null
        console.log(data)

        const variable = new Variable(data.variableName, VariableType.DOUBLE, undefined)

        if (node) {
            node.setVariable(variable)
            node.setMinValue(data.minValue)
            node.setMaxValue(data.maxValue)
            return node
        } else {
            return new RandomFlowNode(variable, data.minValue, data.maxValue)
        }
    }

    load(node: any): BaseFlowNode {
        return new RandomFlowNode(node.variable, 0, 1, true)
    }
}
