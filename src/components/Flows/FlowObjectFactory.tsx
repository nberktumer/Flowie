import {FlowType} from "../../models"
import {FlowModel} from "../../generator/FlowModelJSON"
import {WhileFlowObjectGenerator} from "./While/WhileFlowObjectGenerator"
import {BaseFlowModel} from "../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {InputFlowObjectGenerator} from "./Input/InputFlowObjectGenerator"
import {OutputFlowObjectGenerator} from "./Output/OutputFlowObjectGenerator"
import {ArithmeticFlowObjectGenerator} from "./Arithmetic/ArithmeticFlowObjectGenerator"
import {AssignmentFlowObjectGenerator} from "./Assignment/AssignmentFlowObjectGenerator"
import {InitialFlowObjectGenerator} from "./Initial/InitialFlowObjectGenerator"

export class FlowObjectFactory {
    private constructor() {
    }

    static create(baseFlow: BaseFlowModel): FlowModel | null {
        switch (baseFlow.type) {
            case FlowType.INITIAL:
                return new InitialFlowObjectGenerator().generate(baseFlow)
            case FlowType.IF:
                return null // TODO
            case FlowType.WHILE:
                return new WhileFlowObjectGenerator().generate(baseFlow)
            case FlowType.FOR:
                return null // TODO
            case FlowType.INPUT:
                return new InputFlowObjectGenerator().generate(baseFlow)
            case FlowType.OUTPUT:
                return new OutputFlowObjectGenerator().generate(baseFlow)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowObjectGenerator().generate(baseFlow)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowObjectGenerator().generate(baseFlow)
            default:
                return null
        }
    }
}
