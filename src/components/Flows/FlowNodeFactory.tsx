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
import {IfFlowNodeGenerator} from "./If/IfFlowNodeGenerator"
import {IfFlowNode} from "./If/IfFlowNode"
import {RandomFlowNodeGenerator} from "./Random/RandomFlowNodeGenerator"
import {RandomFlowNode} from "./Random/RandomFlowNode"
import {DataClassFlowNodeGenerator} from "./DataClass/DataClassFlowNodeGenerator"
import {DataClassFlowNode} from "./DataClass/DataClassFlowNode"
import {ReturnFlowNodeGenerator} from "./Return/ReturnFlowNodeGenerator"
import {ReturnFlowNode} from "./Return/ReturnFlowNode"
import {CurrentTimeFlowNodeGenerator} from "./CurrentTime/CurrentTimeFlowNodeGenerator";
import {CurrentTimeFlowNode} from "./CurrentTime/CurrentTimeFlowNode";
import {ClassFlowNodeGenerator} from "./Class/ClassFlowNodeGenerator"
import {ClassFlowNode} from "./Class/ClassFlowNode"

export class FlowNodeFactory {
    private constructor() {
    }

    static create(type: FlowType, data?: BasePropertiesState): BaseFlowNode | undefined {
        switch (type) {
            case FlowType.INITIAL:
                return new InitialFlowNodeGenerator().create(data)
            case FlowType.IF:
                return new IfFlowNodeGenerator().create(data)
            case FlowType.WHILE:
                return new WhileFlowNodeGenerator().create(data)
            case FlowType.INPUT:
                return new InputFlowNodeGenerator().create(data)
            case FlowType.OUTPUT:
                return new OutputFlowNodeGenerator().create(data)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowNodeGenerator().create(data)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowNodeGenerator().create(data)
            case FlowType.RANDOM:
                return new RandomFlowNodeGenerator().create(data)
            case FlowType.CURRENT_TIME:
                return new CurrentTimeFlowNodeGenerator().create(data)
            case FlowType.CLASS:
                return new ClassFlowNodeGenerator().create(data)
            case FlowType.DATA_CLASS:
                return new DataClassFlowNodeGenerator().create(data)
            case FlowType.RETURN:
                return new ReturnFlowNodeGenerator().create(data)
        }
    }

    static load(node: BaseFlowNode): BaseFlowNode {
        switch (node.flowType) {
            case FlowType.INITIAL:
                return new InitialFlowNodeGenerator().load(node)
            case FlowType.IF:
                return new IfFlowNodeGenerator().load(node)
            case FlowType.WHILE:
                return new WhileFlowNodeGenerator().load(node)
            case FlowType.INPUT:
                return new InputFlowNodeGenerator().load(node)
            case FlowType.OUTPUT:
                return new OutputFlowNodeGenerator().load(node)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowNodeGenerator().load(node)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowNodeGenerator().load(node)
            case FlowType.RANDOM:
                return new RandomFlowNodeGenerator().load(node)
            case FlowType.CLASS:
                return new ClassFlowNodeGenerator().load(node)
            case FlowType.CURRENT_TIME:
                return new CurrentTimeFlowNodeGenerator().load(node)
            case FlowType.DATA_CLASS:
                return new DataClassFlowNodeGenerator().load(node)
            case FlowType.RETURN:
                return new ReturnFlowNodeGenerator().load(node)
            default:
                return new BaseFlowNode()
        }
    }

    static update(node: BaseFlowNode, data?: BasePropertiesState): BaseFlowNode | undefined {
        switch (node.flowType) {
            case FlowType.INITIAL:
                return new InitialFlowNodeGenerator().create(data, node as InitialFlowNode)
            case FlowType.IF:
                return new IfFlowNodeGenerator().create(data, node as IfFlowNode)
            case FlowType.WHILE:
                return new WhileFlowNodeGenerator().create(data, node as WhileFlowNode)
            case FlowType.INPUT:
                return new InputFlowNodeGenerator().create(data, node as InputFlowNode)
            case FlowType.OUTPUT:
                return new OutputFlowNodeGenerator().create(data, node as OutputFlowNode)
            case FlowType.ARITHMETIC:
                return new ArithmeticFlowNodeGenerator().create(data, node as ArithmeticFlowNode)
            case FlowType.ASSIGNMENT:
                return new AssignmentFlowNodeGenerator().create(data, node as AssignmentFlowNode)
            case FlowType.RANDOM:
                return new RandomFlowNodeGenerator().create(data, node as RandomFlowNode)
            case FlowType.CURRENT_TIME:
                return new CurrentTimeFlowNodeGenerator().create(data, node as CurrentTimeFlowNode)
            case FlowType.CLASS:
                return new ClassFlowNodeGenerator().create(data, node as ClassFlowNode)
            case FlowType.DATA_CLASS:
                return new DataClassFlowNodeGenerator().create(data, node as DataClassFlowNode)
            case FlowType.RETURN:
                return new ReturnFlowNodeGenerator().create(data, node as ReturnFlowNode)
        }
    }
}
