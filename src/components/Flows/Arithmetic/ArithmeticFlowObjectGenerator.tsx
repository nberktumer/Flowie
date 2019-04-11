import {BaseFlowObjectGenerator} from "../Base/BaseFlowObjectGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowModel} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowType} from "../../../models"
import {ArithmeticFlowModel} from "./ArithmeticFlowModel"
import {ArithmeticFlowContent} from "../../../generator/flows/ArithmeticFlow"

export class ArithmeticFlowObjectGenerator extends BaseFlowObjectGenerator {
    generate(flow: BaseFlowModel): FlowModel {
        const arithmeticFlow = flow as ArithmeticFlowModel

        const nextFlow = arithmeticFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.ARITHMETIC,
            arithmeticFlow.getID(),
            null,
            null,
            null,
            new ArithmeticFlowContent(
                arithmeticFlow.variable,
                arithmeticFlow.operation,
                arithmeticFlow.operator1,
                arithmeticFlow.operator2
            ),
            null,
            nextFlowId
        )
    }
}
