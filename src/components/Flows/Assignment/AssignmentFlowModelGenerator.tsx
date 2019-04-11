import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {AssignmentFlowModel} from "./AssignmentFlowModel"

export class AssignmentFlowModelGenerator extends BaseFlowModelGenerator {
    create(data?: BasePropertiesState): BaseFlowModel | null {
        if (!data || data.variableName === "" || data.variableType === "" || data.value === "")
            return null

        // data.isNull
        const variable = new Variable(data.variableName, data.variableType, data.value)

        return new AssignmentFlowModel(variable)
    }
}
