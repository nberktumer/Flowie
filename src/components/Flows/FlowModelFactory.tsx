import {BaseFlowModel} from "../CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {InputFlowModelGenerator} from "./Input/InputFlowModelGenerator"
import {WhileFlowModelGenerator} from "./While/WhileFlowModelGenerator"
import {OutputFlowModelGenerator} from "./Output/OutputFlowModelGenerator"
import {ArithmeticFlowModelGenerator} from "./Arithmetic/ArithmeticFlowModelGenerator"
import {AssignmentFlowModelGenerator} from "./Assignment/AssignmentFlowModelGenerator"
import {InitialFlowModelGenerator} from "./Initial/InitialFlowModelGenerator"

export class FlowModelFactory {
    private constructor() {
    }

    static create(type: FlowType, data?: BasePropertiesState): BaseFlowModel | null {
        switch (type) {
            case FlowType.INITIAL:
                return new InitialFlowModelGenerator().create(data)
            case FlowType.IF:
                return null // TODO
            case FlowType.WHILE:
                return new WhileFlowModelGenerator().create(data)
            case FlowType.FOR:
                return null // TODO
            case FlowType.INPUT:
                return new InputFlowModelGenerator().create(data)
            case FlowType.OUTPUT:
                return new OutputFlowModelGenerator().create(data)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowModelGenerator().create(data)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowModelGenerator().create(data)
            default:
                return null
        }
    }
}
