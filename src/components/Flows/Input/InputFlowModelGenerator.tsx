import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {InputFlowModel} from "./InputFlowModel"

export class InputFlowModelGenerator extends BaseFlowModelGenerator {
    create(data?: BasePropertiesState): BaseFlowModel | null {
        if (!data || data.variableName === "" || data.variableType === "")
            return null

        const variable = new Variable(data.variableName, data.variableType, null)

        return new InputFlowModel(variable)
    }
}
