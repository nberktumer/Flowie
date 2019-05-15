import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {ReturnFlowNode} from "./ReturnFlowNode"

export class ReturnFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const returnFlow = flow as ReturnFlowNode

        const flowModelBuilder = new FlowModelBuilder(FlowType.RETURN, flow.getID(), null)

        //TODO BERK PLS ADD THIS IDK WHAT TO DO MAN
        //flowModelBuilder.setFlowContent(new ReturnFlowContent())
        return flowModelBuilder.build()
    }
}
