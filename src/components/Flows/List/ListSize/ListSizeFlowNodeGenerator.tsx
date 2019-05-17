import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {ListSizeFlowNode} from "./ListSizeFlowNode"

export class ListSizeFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ListSizeFlowNode): BaseFlowNode | undefined {
        if (!data || !data.list || !data.variable)
            return undefined

        const list = JSON.parse(data.list) as Variable
        const variable = JSON.parse(data.variable) as Variable

        if (node) {
            node.setList(list)
            node.setVariable(variable)
            return node
        } else {
            return new ListSizeFlowNode(list, variable, data.assignToVariableStatus === "new")
        }
    }

    load(node: any): BaseFlowNode {
        return new ListSizeFlowNode(node.list, node.variable, node.isNewVariable, true)
    }
}
