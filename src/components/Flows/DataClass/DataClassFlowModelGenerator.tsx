import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {DataClassFlowNode} from "./DataClassFlowNode"
import {DataClassFlowContent} from "../../../generator/flows/DataClassFlow"

export class DataClassFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const dataClassFlow = flow as DataClassFlowNode

        const nextFlow = dataClassFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.DATA_CLASS,
            dataClassFlow.getID(),
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            new DataClassFlowContent(dataClassFlow.fieldList),
            nextFlowId
        )
    }
}
