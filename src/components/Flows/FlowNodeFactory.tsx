import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {InputFlowNodeGenerator} from "./Input/InputFlowNodeGenerator"
import {WhileFlowNodeGenerator} from "./While/WhileFlowNodeGenerator"
import {OutputFlowNodeGenerator} from "./Output/OutputFlowNodeGenerator"
import {ArithmeticFlowNodeGenerator} from "./Arithmetic/ArithmeticFlowNodeGenerator"
import {AssignmentFlowNodeGenerator} from "./Assignment/AssignmentFlowNodeGenerator"
import {InitialFlowNodeGenerator} from "./Initial/InitialFlowNodeGenerator"
import {InputFlowNode} from "./Input/InputFlowNode"
import {InitialFlowNode} from "./Initial/InitialFlowNode"
import {WhileFlowNode} from "./While/WhileFlowNode"
import {AssignmentFlowNode} from "./Assignment/AssignmentFlowNode"
import {ArithmeticFlowNode} from "./Arithmetic/ArithmeticFlowNode"
import {OutputFlowNode} from "./Output/OutputFlowNode"

export class FlowNodeFactory {
    private constructor() {
    }

    static create(type: FlowType, data?: BasePropertiesState): BaseFlowNode | null {
        switch (type) {
            case FlowType.INITIAL:
                return new InitialFlowNodeGenerator().create(data)
            case FlowType.IF:
                return null // TODO
            case FlowType.WHILE:
                return new WhileFlowNodeGenerator().create(data)
            case FlowType.FOR:
                return null // TODO
            case FlowType.INPUT:
                return new InputFlowNodeGenerator().create(data)
            case FlowType.OUTPUT:
                return new OutputFlowNodeGenerator().create(data)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowNodeGenerator().create(data)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowNodeGenerator().create(data)
            default:
                return null
        }
    }

    static update(node: BaseFlowNode, data?: BasePropertiesState): BaseFlowNode | null {
        console.log(node.flowType)
        switch (node.flowType) {
            case FlowType.INITIAL:
                return new InitialFlowNodeGenerator().create(data, node as InitialFlowNode)
            case FlowType.IF:
                return null // TODO
            case FlowType.WHILE:
                return new WhileFlowNodeGenerator().create(data, node as WhileFlowNode)
            case FlowType.FOR:
                return null // TODO
            case FlowType.INPUT:
                return new InputFlowNodeGenerator().create(data, node as InputFlowNode)
            case FlowType.OUTPUT:
                return new OutputFlowNodeGenerator().create(data, node as OutputFlowNode)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowNodeGenerator().create(data, node as ArithmeticFlowNode)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowNodeGenerator().create(data, node as AssignmentFlowNode)
            default:
                return null
        }
    }
}
