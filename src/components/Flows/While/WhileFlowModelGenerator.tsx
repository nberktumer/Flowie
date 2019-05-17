import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {WhileFlowNode} from "./WhileFlowNode"
import {WhileFlowContent} from "../../../generator/flows/WhileFlow"

export class WhileFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const whileFlow = flow as WhileFlowNode

        const nextFlow = whileFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null
        const scopeFlow = whileFlow.getScopeFlow()
        const scopeFlowId = scopeFlow ? scopeFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.WHILE, whileFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new WhileFlowContent(
            whileFlow.conditionList,
            whileFlow.conditionType,
            scopeFlowId
        ))

        return flowModelBuilder.build()
    }
}
