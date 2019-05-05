import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {AssignmentFlowNode} from "./AssignmentFlowNode"
import {FlowType} from "../../../models"
import {AssignmentFlowContent} from "../../../generator/flows/AssignmentFlow"

export class AssignmentFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const assignmentFlow = flow as AssignmentFlowNode

        const nextFlow = assignmentFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.ASSIGNMENT,
            assignmentFlow.getID(),
            new AssignmentFlowContent(assignmentFlow.getVariable()),
            null,
            null,
            null,
            null,
            null,
            null,
            nextFlowId
        )
    }
}
