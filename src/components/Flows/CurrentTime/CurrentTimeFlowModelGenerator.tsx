import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {CurrentTimeFlowNode} from "./CurrentTimeFlowNode"
import {FlowType} from "../../../models"
import {CurrentTimeFlowContent} from "../../../generator/flows/CurrentTimeFlow";

export class CurrentTimeFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const currentTimeFlow = flow as CurrentTimeFlowNode

        const nextFlow = currentTimeFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.CURRENT_TIME, currentTimeFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new CurrentTimeFlowContent(currentTimeFlow.getVariable()))
        return flowModelBuilder.build()
    }
}
