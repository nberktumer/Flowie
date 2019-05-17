import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {ListGetFlowNode} from "./ListGetFlowNode"
import {FlowType} from "../../../../models"
import {ListGetFlowContent} from "../../../../generator/flows/ListGetFlow"

export class ListGetFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const listGetFlow = flow as ListGetFlowNode

        const nextFlow = listGetFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_GET, listGetFlow.getID(), nextFlowId)
            .setFlowContent(new ListGetFlowContent(listGetFlow.variable, listGetFlow.list, listGetFlow.index))
            .build()
    }
}
