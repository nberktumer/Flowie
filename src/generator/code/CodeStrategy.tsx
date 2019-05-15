import {Func} from "../project/Func";
import {Clazz} from "../project/Clazz";
import {ArithmeticFlowCode} from "./common/ArithmeticFlowCode";
import {AssignmentFlowCode} from "./common/AssignmentFlowCode";
import {OutputFlowCode} from "./common/OutputFlowCode";
import {RandomFlowCode} from "./common/RandomFlowCode";
import {WhileFlowCode} from "./common/WhileFlowCode";
import {IfFlowCode} from "./common/IfFlowCode";
import {InputFlowCode} from "./common/InputFlowCode";
import {DataClazz} from "../project/DataClazz";
import {DataClassFlowCode} from "./common/DataClassFlowCode";
import {ReturnFlowCode} from "./common/ReturnFlowCode";
import {FunctionalityFlowCode} from "./common/FunctionalityFlowCode";

export interface CodeStrategy {
    arithmeticFlowCode: ArithmeticFlowCode
    assignmentFlowCode: AssignmentFlowCode
    inputFlowCode: InputFlowCode
    outputFlowCode: OutputFlowCode
    randomFlowCode: RandomFlowCode
    whileFlowCode: WhileFlowCode
    ifFlowCode: IfFlowCode
    dataClassFlowCode: DataClassFlowCode
    returnFlowCode: ReturnFlowCode
    functionalityFlowCode: FunctionalityFlowCode

    initClazz(clazz: Clazz): void

    finishClazz(clazz: Clazz): void

    initClazzCode(clazz: Clazz): void

    finishClazzCode(clazz: Clazz): void

    initMain(clazz: Clazz): void

    finishMain(clazz: Clazz): void

    initFunction(func: Func): void

    finishFunction(func: Func): void

    generateDataClazz(dataClazz: DataClazz): void

    //getDataClassSignature(dataClazz: DataClazz): string

    //getDataClassCode(dataClazz: DataClazz): Code
}
