import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "./BaseProperties"
import {InputFlowNode} from "../Input/InputFlowNode"

export abstract class BaseFlowNodeGenerator {
    abstract create(data?: BasePropertiesState, node?: BaseFlowNode): BaseFlowNode | null
}
