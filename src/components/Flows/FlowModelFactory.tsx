import {FlowType} from "../../models"
import {FlowModel} from "../../generator/FlowModelJSON"
import {WhileFlowModelGenerator} from "./While/WhileFlowModelGenerator"
import {InputFlowModelGenerator} from "./Input/InputFlowModelGenerator"
import {OutputFlowModelGenerator} from "./Output/OutputFlowModelGenerator"
import {ArithmeticFlowModelGenerator} from "./Arithmetic/ArithmeticFlowModelGenerator"
import {AssignmentFlowModelGenerator} from "./Assignment/AssignmentFlowModelGenerator"
import {InitialFlowModelGenerator} from "./Initial/InitialFlowModelGenerator"
import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {IfFlowModelGenerator} from "./If/IfFlowModelGenerator"
import {RandomFlowModelGenerator} from "./Random/RandomFlowModelGenerator"
import {DataClassFlowModelGenerator} from "./DataClass/DataClassFlowModelGenerator"
import {ReturnFlowModelGenerator} from "./Return/ReturnFlowModelGenerator";
import {CurrentTimeFlowModelGenerator} from "./CurrentTime/CurrentTimeFlowModelGenerator";

export class FlowModelFactory {
    private constructor() {
    }

    static create(baseFlow: BaseFlowNode): FlowModel | null {
        switch (baseFlow.flowType) {
            case FlowType.INITIAL:
                return new InitialFlowModelGenerator().generate(baseFlow)
            case FlowType.IF:
                return new IfFlowModelGenerator().generate(baseFlow)
            case FlowType.WHILE:
                return new WhileFlowModelGenerator().generate(baseFlow)
            case FlowType.INPUT:
                return new InputFlowModelGenerator().generate(baseFlow)
            case FlowType.OUTPUT:
                return new OutputFlowModelGenerator().generate(baseFlow)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowModelGenerator().generate(baseFlow)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowModelGenerator().generate(baseFlow)
            case FlowType.RANDOM:
                return new RandomFlowModelGenerator().generate(baseFlow)
            case FlowType.CURRENT_TIME:
                return new CurrentTimeFlowModelGenerator().generate(baseFlow)
            case FlowType.DATA_CLASS:
                return new DataClassFlowModelGenerator().generate(baseFlow)
            case FlowType.RETURN:
                return new ReturnFlowModelGenerator().generate(baseFlow)
            default:
                return null
        }
    }
}
