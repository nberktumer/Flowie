import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {ListAddFlowNode} from "./ListAddFlowNode"
import {FlowType} from "../../../../models"
import {ListAddFlowContent} from "../../../../generator/flows/ListAddFlow"

export class ListAddFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const listAddFlow = flow as ListAddFlowNode

        const nextFlow = listAddFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_ADD, listAddFlow.getID(), nextFlowId)
            .setFlowContent(new ListAddFlowContent(listAddFlow.list, listAddFlow.variable))
            .build()
    }
}
