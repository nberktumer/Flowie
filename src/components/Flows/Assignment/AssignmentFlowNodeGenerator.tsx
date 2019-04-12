import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {AssignmentFlowNode} from "./AssignmentFlowNode"

export class AssignmentFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState): BaseFlowNode | null {
        if (!data || data.variableName === "" || data.variableType === "" || data.value === "")
            return null

        // data.isNull
        const variable = new Variable(data.variableName, data.variableType, data.value)

        return new AssignmentFlowNode(variable)
    }
}
