import {BaseFlowNodeGenerator} from "../Base/BaseFlowNodeGenerator"
import {BaseFlowNode} from "../../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BasePropertiesState} from "../Base/BaseProperties"
import {ArithmeticFlowNode} from "./ArithmeticFlowNode"
import {Variable} from "../../../models/Variable"

export class ArithmeticFlowNodeGenerator extends BaseFlowNodeGenerator {
    create(data?: BasePropertiesState, node?: ArithmeticFlowNode): BaseFlowNode | null {
        if (!data || data.variable === "" || data.operation === "" || data.operator1 === "" || data.operator2 === "")
            return null

        const op1 = JSON.parse(data.operator1) as Variable
        const op2 = JSON.parse(data.operator2) as Variable

        if (node !== undefined) {
            node.setVariable(JSON.parse(data.variable))
            node.setOperation(data.operation)
            node.setOperator1(op1)
            node.setOperator2(op2)
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

    load(node: any): BaseFlowNode {
        return new ArithmeticFlowNode(node.variable, node.operation, node.operator1, node.operator2, true)
    }
}
