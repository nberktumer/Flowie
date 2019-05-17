import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {RandomFlowNode} from "./RandomFlowNode"
import {FlowType} from "../../../models"
import {RandomFlowContent} from "../../../generator/flows/RandomFlow"

export class RandomFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const randomFlow = flow as RandomFlowNode

        const nextFlow = randomFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.RANDOM, randomFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new RandomFlowContent(randomFlow.getVariable(), randomFlow.minValue, randomFlow.maxValue))
        return flowModelBuilder.build()
    }
}
