import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {InputFlowNode} from "./InputFlowNode"
import {InputFlowContent} from "../../../generator/flows/InputFlow"

export class InputFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const inputFlow = flow as InputFlowNode

        const nextFlow = inputFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.INPUT,
            inputFlow.getID(),
            null,
            new InputFlowContent(inputFlow.getVariable()),
            null,
            null,
            null,
            nextFlowId
        )
    }
}
