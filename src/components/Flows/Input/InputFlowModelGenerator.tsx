import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {InputFlowNode} from "./InputFlowNode"
import {InputFlowContent} from "../../../generator/flows/InputFlow"

export class InputFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const inputFlow = flow as InputFlowNode

        const nextFlow = inputFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.INPUT, inputFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new InputFlowContent(inputFlow.getVariable()))
        return flowModelBuilder.build()
    }
}
