import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {DataClassFlowNode} from "./DataClassFlowNode"
import {DataClassFlowContent} from "../../../generator/flows/DataClassFlow"

export class DataClassFlowModelGenerator extends BaseFlowModelGenerator {
    generate(flow: BaseFlowNode): FlowModel {
        const dataClassFlow = flow as DataClassFlowNode

        const nextFlow = dataClassFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModelBuilder(FlowType.DATA_CLASS, dataClassFlow.getID(), nextFlowId).setFlowContent(
            new DataClassFlowContent(dataClassFlow.variableName, dataClassFlow.name, dataClassFlow.fieldList)
        ).build()
    }
}
