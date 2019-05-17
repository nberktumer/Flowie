import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {ListRemoveFlowNode} from "./ListRemoveFlowNode"
import {FlowType} from "../../../../models"
import {ListRemoveFlowContent} from "../../../../generator/flows/ListRemoveFlow"

export class ListRemoveFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const listRemoveFlow = flow as ListRemoveFlowNode

        const nextFlow = listRemoveFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_REMOVE, listRemoveFlow.getID(), nextFlowId)
            .setFlowContent(new ListRemoveFlowContent(listRemoveFlow.list, listRemoveFlow.index))
            .build()
    }
}
