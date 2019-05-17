import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {AssignmentFlowNode} from "./AssignmentFlowNode"
import {FlowType} from "../../../models"
import {AssignmentFlowContent} from "../../../generator/flows/AssignmentFlow"

export class AssignmentFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const assignmentFlow = flow as AssignmentFlowNode

        const nextFlow = assignmentFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.ASSIGNMENT, assignmentFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new AssignmentFlowContent(assignmentFlow.getVariable()))
        return flowModelBuilder.build()
    }
}
