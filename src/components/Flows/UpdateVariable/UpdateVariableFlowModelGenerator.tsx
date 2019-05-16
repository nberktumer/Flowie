import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {UpdateVariableFlowNode} from "./UpdateVariableFlowNode"
import {FlowType} from "../../../models"
import {UpdateVariableFlowContent} from "../../../generator/flows/UpdateVariableFlow"

export class UpdateVariableFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const updateVariableFlow = flow as UpdateVariableFlowNode

        const nextFlow = updateVariableFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.UPDATE_VARIABLE, updateVariableFlow.getID(), nextFlowId)
            .setFlowContent(new UpdateVariableFlowContent(updateVariableFlow.variable, updateVariableFlow.variableValue))
            .build()
    }
}
