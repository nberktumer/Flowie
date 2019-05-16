import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {ListUpdateFlowNode} from "./ListUpdateFlowNode"

export class ListUpdateFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ListUpdateFlowNode): BaseFlowNode | undefined {
        if (!data || !data.list || !data.variable || !data.index)
            return undefined

        const list = JSON.parse(data.list) as Variable
        const variable = JSON.parse(data.variable) as Variable

        if (node) {
            node.setList(list)
            node.setVariable(variable)
            node.setIndex(data.index)
            return node
        } else {
            return new ListUpdateFlowNode(list, variable, data.index)
        }
    }

    load(node: any): BaseFlowNode {
        return new ListUpdateFlowNode(node.list, node.variable, node.index, true)
    }
}
