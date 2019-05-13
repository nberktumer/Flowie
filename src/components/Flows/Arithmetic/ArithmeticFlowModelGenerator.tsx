import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"
import {ArithmeticFlowContent} from "../../../generator/flows/ArithmeticFlow"

export class ArithmeticFlowModelGenerator extends BaseFlowModelGenerator {
    generate = (flow: BaseFlowNode): FlowModel => {
        const arithmeticFlow = flow as ArithmeticFlowNode

        const nextFlow = arithmeticFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        return new FlowModel(
            FlowType.ARITHMETIC,
            arithmeticFlow.getID(),
            null,
            null,
            null,
            new ArithmeticFlowContent(
                arithmeticFlow.getVariable(),
                arithmeticFlow.getOperation(),
                arithmeticFlow.getOperator1(),
                arithmeticFlow.getOperator2()
            ),
            null,
            null,
            null,
            null,
            nextFlowId
        )
    }
}
