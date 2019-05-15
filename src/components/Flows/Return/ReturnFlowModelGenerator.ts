import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {ReturnFlowNode} from "./ReturnFlowNode"

export class ReturnFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const returnFlow = flow as ReturnFlowNode

        return new FlowModel(
            FlowType.RETURN,
            flow.getID(),
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        )
    }
}
