import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {ListUpdateFlowNode} from "./ListUpdateFlowNode"
import {FlowType} from "../../../../models"
import {ListUpdateFlowContent} from "../../../../generator/flows/ListUpdateFlow"

export class ListUpdateFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const listUpdateFlow = flow as ListUpdateFlowNode

        const nextFlow = listUpdateFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_UPDATE, listUpdateFlow.getID(), nextFlowId)
            .setFlowContent(new ListUpdateFlowContent(listUpdateFlow.list, listUpdateFlow.variable, listUpdateFlow.index))
            .build()
    }
}
