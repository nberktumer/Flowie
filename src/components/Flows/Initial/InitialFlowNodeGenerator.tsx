import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {InitialFlowNode} from "./InitialFlowNode"

export class InitialFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: InitialFlowNode): BaseFlowNode | undefined {
        return new InitialFlowNode()
    }

    load(node: BaseFlowNode): BaseFlowNode {
       return new InitialFlowNode(true)
    }
}
