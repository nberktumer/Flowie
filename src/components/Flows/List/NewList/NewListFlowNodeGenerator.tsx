import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {NewListFlowNode} from "./NewListFlowNode"
import {VariableType} from "../../../../models"

export class NewListFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: NewListFlowNode): BaseFlowNode | undefined {
        if (!data || !data.variableName || !data.variableType)
            return undefined

        const variable = new Variable(data.variableName, VariableType.LIST, undefined, data.variableType)

        if (node) {
            node.setVariable(variable)
            return node
        } else {
            return new NewListFlowNode(variable)
        }
    }

    load(node: any): BaseFlowNode {
        return new NewListFlowNode(node.variable, true)
    }
}
