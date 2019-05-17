import {BaseFlowModelGenerator} from "../../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {NewListFlowNode} from "./NewListFlowNode"
import {FlowType} from "../../../../models"
import {ListNewFlowContent} from "../../../../generator/flows/ListNewFlow"

export class NewListFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const newListFlow = flow as NewListFlowNode

        const nextFlow = newListFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.LIST_NEW, newListFlow.getID(), nextFlowId)
            .setFlowContent(new ListNewFlowContent(newListFlow.getVariable()))
            .build()
    }
}
