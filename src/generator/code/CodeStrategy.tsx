import {Func} from "../project/Func";
import {Clazz} from "../project/Clazz";
import {ArithmeticFlowCode} from "./common/ArithmeticFlowCode";
import {AssignmentFlowCode} from "./common/AssignmentFlowCode";
import {OutputFlowCode} from "./common/OutputFlowCode";
import {RandomFlowCode} from "./common/RandomFlowCode";
import {WhileFlowCode} from "./common/WhileFlowCode";
import {IfFlowCode} from "./common/IfFlowCode";
import {InputFlowCode} from "./common/InputFlowCode";

export interface CodeStrategy {
    arithmeticFlowCode: ArithmeticFlowCode
    assignmentFlowCode: AssignmentFlowCode
    inputFlowCode: InputFlowCode
    outputFlowCode: OutputFlowCode
    randomFlowCode: RandomFlowCode
    whileFlowCode: WhileFlowCode
    ifFlowCode: IfFlowCode

    initClazz(clazz: Clazz): void

    finishClass(clazz: Clazz): void

    initMain(clazz: Clazz): void

    finishMain(clazz: Clazz): void

    generateFunctionCode(func: Func): void

}
