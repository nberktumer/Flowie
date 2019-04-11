import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"

export abstract class BaseFlowObjectGenerator {
    abstract generate(flow: BaseFlowModel): FlowModel
}
