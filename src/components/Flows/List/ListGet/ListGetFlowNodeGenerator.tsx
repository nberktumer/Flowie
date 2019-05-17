import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {ListGetFlowNode} from "./ListGetFlowNode"

export class ListGetFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ListGetFlowNode): BaseFlowNode | undefined {
        if (!data || !data.list || !data.variable || !data.index)
            return undefined

        const list = JSON.parse(data.list) as Variable
        const variable = JSON.parse(data.variable) as Variable
        const index = JSON.parse(data.index) as Variable

        if (node) {
            node.setList(list)
            node.setVariable(variable)
            node.setIndex(index)
            return node
        } else {
            return new ListGetFlowNode(list, variable, index, data.assignToVariableStatus === "new")
        }
    }

    load(node: any): BaseFlowNode {
        return new ListGetFlowNode(node.list, node.variable, node.index, node.isNewVariable, true)
    }
}
