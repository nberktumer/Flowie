import {BaseFlowModelGenerator} from "../Base/BaseFlowModelGenerator"
import {FlowModel, FlowModelBuilder} from "../../../generator/FlowModelJSON"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../../models"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"
import {ArithmeticFlowContent} from "../../../generator/flows/ArithmeticFlow"

export class ArithmeticFlowModelGenerator extends BaseFlowModelGenerator {
    generate = (flow: BaseFlowNode): FlowModel => {
        const arithmeticFlow = flow as ArithmeticFlowNode

        const nextFlow = arithmeticFlow.getNextFlow()
        const nextFlowId = nextFlow ? nextFlow.getID() : null

        const flowModelBuilder = new FlowModelBuilder(FlowType.ARITHMETIC, arithmeticFlow.getID(), nextFlowId)
        flowModelBuilder.setFlowContent(new ArithmeticFlowContent(
            arithmeticFlow.getVariable(),
            arithmeticFlow.getOperation(),
            arithmeticFlow.getOperator1(),
            arithmeticFlow.getOperator2()
        ))

        return flowModelBuilder.build()
    }
}
