import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {Variable} from "../../../models/Variable"
import {Operator, OperatorType} from "../../../generator/flows/ArithmeticFlow"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"

export class ArithmeticFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ArithmeticFlowNode): BaseFlowNode | null {
        if (!data || data.variable === "" || data.operation === "" || data.operator1 === "" || data.operator2 === "")
            return null

        const var1 = JSON.parse(data.operator1) as Variable
        const var2 = JSON.parse(data.operator2) as Variable

        const op1 = new Operator(OperatorType.VARIABLE, var1.name, var1.value)
        const op2 = new Operator(OperatorType.VARIABLE, var2.name, var2.value)

        if (node !== undefined) {
            node.variable = JSON.parse(data.variable)
            node.operation = data.operation
            node.operator1 = op1
            node.operator2 = op2
            return node
        } else {
            return new ArithmeticFlowNode(
                JSON.parse(data.variable),
                data.operation,
                op1,
                op2
            )
        }

    }
}
