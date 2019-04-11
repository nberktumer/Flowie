import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Condition} from "../../../models/Condition"
import {WhileFlowModel} from "./WhileFlowModel"

export class WhileFlowModelGenerator extends BaseFlowModelGenerator {
    create(data?: BasePropertiesState): BaseFlowModel | null {
        if (!data || data.variableType === "" || data.first === "" || data.second === "" || data.operation === "")
            return null

        const condition = new Condition(data.variableType, JSON.parse(data.first), JSON.parse(data.second), data.operation)

        const node = new WhileFlowModel()
        node.addCondition(condition)
        return node
    }
}
