import {BaseFlowObjectGenerator} from "../Base/BaseFlowObjectGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowType} from "../../../models"
import {WhileFlowModel} from "./WhileFlowModel"
import {WhileFlowContent} from "../../../generator/flows/WhileFlow"

export class WhileFlowObjectGenerator extends BaseFlowObjectGenerator {
    generate(flow: BaseFlowModel): FlowModel {
        const whileFlow = flow as WhileFlowModel

        const nextFlow = whileFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null
        const scopeFlow = whileFlow.getScopeFlow()
        const scopeFlowId = scopeFlow ? scopeFlow.getID() : null

        return new FlowModel(
            FlowType.WHILE,
            whileFlow.getID(),
            null,
            null,
            null,
            null,
            new WhileFlowContent(
                whileFlow.conditionList,
                scopeFlowId
            ),
            nextFlowId
        )
    }
}
