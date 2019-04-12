import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "./BaseProperties"

export abstract class BaseFlowNodeGenerator {
    abstract create(data?: BasePropertiesState): BaseFlowNode | null
}
