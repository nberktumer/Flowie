import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {UpdateVariableFlowNode} from "./UpdateVariableFlowNode"

export class UpdateVariableFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: UpdateVariableFlowNode): BaseFlowNode | undefined {
        if (!data || !data.variable || !data.variableValue)
            return undefined

        const variable = JSON.parse(data.variable) as Variable
        const variableValue = JSON.parse(data.variableValue) as Variable

        if (node) {
            node.setVariable(variable)
            return node
        } else {
            return new UpdateVariableFlowNode(variable, variableValue)
        }
    }

    load(node: any): BaseFlowNode {
        return new UpdateVariableFlowNode(node.variable, node.variableValue, true)
    }
}
