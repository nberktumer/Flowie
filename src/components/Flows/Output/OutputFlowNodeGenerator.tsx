import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {OutputFlowNode} from "./OutputFlowNode"

export class OutputFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: OutputFlowNode): BaseFlowNode | undefined {
        if (!data || data.variable === "" || !data.isNewLine)
            return undefined

        if (node !== undefined) {
            node.setVariable(JSON.parse(data.variable))
            node.isNewLine = JSON.parse(data.isNewLine)
            return node
        } else {
            return new OutputFlowNode(JSON.parse(data.variable), JSON.parse(data.isNewLine))
        }
    }

    load(node: any): BaseFlowNode {
        return new OutputFlowNode(node.variable, node.isNewLine, true)
    }
}
