import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {ListClearFlowNode} from "./ListClearFlowNode"
import {FlowType} from "../../../../models"
import {ListClearFlowContent} from "../../../../generator/flows/ListClearFlow"

export class ListClearFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const listClearFlow = flow as ListClearFlowNode

        const nextFlow = listClearFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_CLEAR, listClearFlow.getID(), nextFlowId)
            .setFlowContent(new ListClearFlowContent(listClearFlow.list))
            .build()
    }
}
