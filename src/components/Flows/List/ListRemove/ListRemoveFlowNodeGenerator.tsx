import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {ListRemoveFlowNode} from "./ListRemoveFlowNode"

export class ListRemoveFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ListRemoveFlowNode): BaseFlowNode | undefined {
        if (!data || !data.list || !data.index)
            return undefined

        const list = JSON.parse(data.list) as Variable

        if (node) {
            node.setList(list)
            node.setIndex(data.index)
            return node
        } else {
            return new ListRemoveFlowNode(list, data.index)
        }
    }

    load(node: any): BaseFlowNode {
        return new ListRemoveFlowNode(node.list, node.index, true)
    }
}
