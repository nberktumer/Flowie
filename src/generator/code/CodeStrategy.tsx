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

    finishClazz(clazz: Clazz): void

    initMain(clazz: Clazz): void

    finishMain(clazz: Clazz): void

    initFunction(func: Func): void

    finishFunction(func: Func): void

    //getDataClassSignature(dataClazz: DataClazz): string

    //getDataClassCode(dataClazz: DataClazz): Code
}
