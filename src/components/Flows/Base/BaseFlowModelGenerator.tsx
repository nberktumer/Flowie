import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"

export abstract class BaseFlowModelGenerator {
    abstract generate(flow: BaseFlowNode): FlowModel
}
