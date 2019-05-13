import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {OutputFlowNode} from "./OutputFlowNode"
import {OutputFlowContent} from "../../../generator/flows/OutputFlow"

export class OutputFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const outputFlow = flow as OutputFlowNode

        const nextFlow = outputFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.OUTPUT,
            outputFlow.getID(),
            null,
            null,
            new OutputFlowContent(outputFlow.getVariable()),
            null,
            null,
            null,
            null,
            null,
            nextFlowId
        )
    }
}
