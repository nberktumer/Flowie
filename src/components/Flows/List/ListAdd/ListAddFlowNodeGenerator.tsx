import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {ListAddFlowNode} from "./ListAddFlowNode"

export class ListAddFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ListAddFlowNode): BaseFlowNode | undefined {
        if (!data || !data.list || !data.variable)
            return undefined

        const list = JSON.parse(data.list) as Variable
        const variable = JSON.parse(data.variable) as Variable

        if (node) {
            node.setList(list)
            node.setVariable(variable)
            return node
        } else {
            return new ListAddFlowNode(list, variable)
        }
    }

    load(node: any): BaseFlowNode {
        return new ListAddFlowNode(node.list, node.variable, true)
    }
}
