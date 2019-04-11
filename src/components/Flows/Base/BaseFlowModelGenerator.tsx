import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {BasePropertiesState} from "./BaseProperties"

export abstract class BaseFlowModelGenerator {
    abstract create(data?: BasePropertiesState): BaseFlowModel | null
}
