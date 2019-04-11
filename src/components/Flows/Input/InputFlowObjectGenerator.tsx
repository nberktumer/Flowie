import {BaseFlowObjectGenerator} from "../Base/BaseFlowObjectGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowType} from "../../../models"
import {InputFlowModel} from "./InputFlowModel"
import {InputFlowContent} from "../../../generator/flows/InputFlow"

export class InputFlowObjectGenerator extends BaseFlowObjectGenerator {
    generate(flow: BaseFlowModel): FlowModel {
        const inputFlow = flow as InputFlowModel

        const nextFlow = inputFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.INPUT,
            inputFlow.getID(),
            null,
            new InputFlowContent(inputFlow.variable),
            null,
            null,
            null,
            nextFlowId
        )
    }
}
