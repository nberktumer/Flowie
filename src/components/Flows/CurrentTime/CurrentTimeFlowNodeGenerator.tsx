import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {CurrentTimeFlowNode} from "./CurrentTimeFlowNode"
import {VariableType} from "../../../models"

export class CurrentTimeFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: CurrentTimeFlowNode): BaseFlowNode | undefined {
        if (!data || data.variableName === "")
            return undefined

        const variable = new Variable(data.variableName, VariableType.LONG, undefined)

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
