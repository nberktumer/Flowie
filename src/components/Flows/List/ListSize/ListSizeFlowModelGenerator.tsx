import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {ListSizeFlowNode} from "./ListSizeFlowNode"
import {FlowType} from "../../../../models"
import {ListSizeFlowContent} from "../../../../generator/flows/ListSizeFlow"

export class ListSizeFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const listSizeFlow = flow as ListSizeFlowNode

        const nextFlow = listSizeFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_SIZE, listSizeFlow.getID(), nextFlowId)
            .setFlowContent(new ListSizeFlowContent(listSizeFlow.variable, listSizeFlow.list))
            .build()
    }
}
