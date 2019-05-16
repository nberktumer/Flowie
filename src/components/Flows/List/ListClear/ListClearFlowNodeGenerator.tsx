import {BaseFlowNodeGenerator} from "../../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../../Base/BaseProperties"
import {Variable} from "../../../../models/Variable"
import {ListClearFlowNode} from "./ListClearFlowNode"

export class ListClearFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ListClearFlowNode): BaseFlowNode | undefined {
        if (!data || !data.list)
            return undefined

        const list = JSON.parse(data.list) as Variable

        if (node) {
            node.setList(list)
            return node
        } else {
            return new ListClearFlowNode(list)
        }
    }

    load(node: any): BaseFlowNode {
        return new ListClearFlowNode(node.list, true)
    }
}
