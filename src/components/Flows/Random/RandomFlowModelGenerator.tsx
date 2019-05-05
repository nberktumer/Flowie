import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {RandomFlowNode} from "./RandomFlowNode"
import {FlowType} from "../../../models"
import {RandomFlowContent} from "../../../generator/flows/RandomFlow"

export class RandomFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const randomFlow = flow as RandomFlowNode

        const nextFlow = randomFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.RANDOM,
            randomFlow.getID(),
            null,
            null,
            null,
            null,
            null,
            null,
            new RandomFlowContent(randomFlow.getVariable(), randomFlow.minValue, randomFlow.maxValue),
            nextFlowId
        )
    }
}
