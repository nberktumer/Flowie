import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {BasePropertiesState} from "../Base/BaseProperties"
import {OutputFlowModel} from "./OutputFlowModel"

export class OutputFlowModelGenerator extends BaseFlowModelGenerator {
    create(data?: BasePropertiesState): BaseFlowModel | null {
        if (!data || data.variable === "")
            return null

        return new OutputFlowModel(JSON.parse(data.variable))
    }
}
