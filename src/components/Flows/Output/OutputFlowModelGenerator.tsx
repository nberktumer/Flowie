import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {OutputFlowNode} from "./OutputFlowNode"
import {OutputFlowContent} from "../../../generator/flows/OutputFlow"

export class OutputFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const outputFlow = flow as OutputFlowNode

        const nextFlow = outputFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.OUTPUT, outputFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new OutputFlowContent(outputFlow.getVariable()))
        return flowModelBuilder.build()
    }
}
