import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {OutputFlowNode} from "./OutputFlowNode"

export class OutputFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState): BaseFlowNode | null {
        if (!data || data.variable === "")
            return null

        return new OutputFlowNode(JSON.parse(data.variable))
    }
}
