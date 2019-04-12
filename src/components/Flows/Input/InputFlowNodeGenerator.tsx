import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {InputFlowNode} from "./InputFlowNode"

export class InputFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState): BaseFlowNode | null {
        if (!data || data.variableName === "" || data.variableType === "")
            return null

        const variable = new Variable(data.variableName, data.variableType, null)

        return new InputFlowNode(variable)
    }
}
