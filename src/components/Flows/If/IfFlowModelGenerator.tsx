import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {IfFlowNode} from "./IfFlowNode"
import {IfFlowContent} from "../../../generator/flows/IfFlow"

export class IfFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const ifFlow = flow as IfFlowNode

        const nextFlow = ifFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null
        const trueScopeFlow = ifFlow.getTrueScopeFlow()
        const trueScopeFlowId = trueScopeFlow ? trueScopeFlow.getID() : null
        const falseScopeFlow = ifFlow.getFalseScopeFlow()
        const falseScopeFlowId = falseScopeFlow ? falseScopeFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.IF, ifFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new IfFlowContent(
            ifFlow.conditionList,
            ifFlow.conditionType,
            trueScopeFlowId,
            falseScopeFlowId
        ))
        return flowModelBuilder.build()
    }
}
