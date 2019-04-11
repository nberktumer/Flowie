import {BaseFlowObjectGenerator} from "../Base/BaseFlowObjectGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {AssignmentFlowModel} from "./AssignmentFlowModel"
import {FlowType} from "../../../models"
import {AssignmentFlowContent} from "../../../generator/flows/AssignmentFlow"

export class AssignmentFlowObjectGenerator extends BaseFlowObjectGenerator {
    generate(flow: BaseFlowModel): FlowModel {
        const assignmentFlow = flow as AssignmentFlowModel

        const nextFlow = assignmentFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.ASSIGNMENT,
            assignmentFlow.getID(),
            new AssignmentFlowContent(assignmentFlow.variable),
            null,
            null,
            null,
            null,
            nextFlowId
        )
    }
}
