import {BaseFlowObjectGenerator} from "../Base/BaseFlowObjectGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowType} from "../../../models"
import {OutputFlowModel} from "./OutputFlowModel"
import {OutputFlowContent} from "../../../generator/flows/OutputFlow"

export class OutputFlowObjectGenerator extends BaseFlowObjectGenerator {
    generate(flow: BaseFlowModel): FlowModel {
        const outputFlow = flow as OutputFlowModel

        const nextFlow = outputFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.OUTPUT,
            outputFlow.getID(),
            null,
            null,
            new OutputFlowContent(outputFlow.variable),
            null,
            null,
            nextFlowId
        )
    }
}
