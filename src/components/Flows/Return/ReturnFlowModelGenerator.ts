import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {ReturnFlowNode} from "./ReturnFlowNode"
import {ReturnFlowContent} from "../../../generator/flows/ReturnFlow"

export class ReturnFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const returnFlow = flow as ReturnFlowNode

        return new FlowModelBuilder(FlowType.RETURN, flow.getID(), null)
            .setFlowContent(new ReturnFlowContent(returnFlow.getVariable()))
            .build()
    }
}
