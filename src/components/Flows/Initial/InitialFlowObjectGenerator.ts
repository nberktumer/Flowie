import {BaseFlowObjectGenerator} from "../Base/BaseFlowObjectGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowType} from "../../../models"
import {InitialFlowModel} from "./InitialFlowModel"

export class InitialFlowObjectGenerator extends BaseFlowObjectGenerator {
    generate(flow: BaseFlowModel): FlowModel {
        const initialFlow = flow as InitialFlowModel

        const nextFlow = initialFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.INITIAL,
            "INITIAL_ID",
            null,
            null,
            null,
            null,
            null,
            nextFlowId
        )
    }
}
