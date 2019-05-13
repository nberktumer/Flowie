import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {InputFlowNode} from "./InputFlowNode"

export class InputFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: InputFlowNode): BaseFlowNode | undefined {
        if (!data || data.variableName === "" || data.variableType === "")
            return undefined

        const variable = new Variable(data.variableName, data.variableType, null)

        if (node !== undefined) {
            node.setVariable(variable)
            return node
        } else {
            return new InputFlowNode(variable)
        }
    }

    load(node: any): BaseFlowNode {
        return new InputFlowNode(node.variable, true)
    }

}
