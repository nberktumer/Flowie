import {FlowType} from "../../models"
import {FlowModel} from "../../generator/FlowModelJSON"
import {WhileFlowModelGenerator} from "./While/WhileFlowModelGenerator"
import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {InputFlowModelGenerator} from "./Input/InputFlowModelGenerator"
import {OutputFlowModelGenerator} from "./Output/OutputFlowModelGenerator"
import {ArithmeticFlowModelGenerator} from "./Arithmetic/ArithmeticFlowModelGenerator"
import {AssignmentFlowModelGenerator} from "./Assignment/AssignmentFlowModelGenerator"
import {InitialFlowModelGenerator} from "./Initial/InitialFlowModelGenerator"

export class FlowModelFactory {
    private constructor() {
    }

    static create(baseFlow: BaseFlowNode): FlowModel | null {
        switch (baseFlow.type) {
            case FlowType.INITIAL:
                return new InitialFlowModelGenerator().generate(baseFlow)
            case FlowType.IF:
                return null // TODO
            case FlowType.WHILE:
                return new WhileFlowModelGenerator().generate(baseFlow)
            case FlowType.FOR:
                return null // TODO
            case FlowType.INPUT:
                return new InputFlowModelGenerator().generate(baseFlow)
            case FlowType.OUTPUT:
                return new OutputFlowModelGenerator().generate(baseFlow)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowModelGenerator().generate(baseFlow)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowModelGenerator().generate(baseFlow)
            default:
                return null
        }
    }
}
