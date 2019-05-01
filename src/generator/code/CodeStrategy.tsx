import {Func} from "../Func";
import {ArithmeticFlow} from "../flows/ArithmeticFlow";
import {InputFlow} from "../flows/InputFlow";
import {OutputFlow} from "../flows/OutputFlow";
import {WhileFlow} from "../flows/WhileFlow";
import {AssignmentFlow} from "../flows/AssignmentFlow";
import {Class} from "./Class";

export interface CodeStrategy {

    initClass(clazz: Class): void

    finishClass(): void

    initMain(): void

    finishMain(): void

    writeFunctionSignature(func: Func): void

    writeArithmeticMain(arithmeticFlow: ArithmeticFlow): void

    writeArithmeticFunction(arithmeticFlow: ArithmeticFlow): void

    writeAssignmentMain(assignmentFlow: AssignmentFlow): void

    writeAssignmentFunction(assignmentFlow: AssignmentFlow): void

    writeInputMain(inputFlow: InputFlow): void

    writeInputFunction(inputFlow: InputFlow): void

    writeOutputMain(outputFlow: OutputFlow): void

    writeOutputFunction(outputFlow: OutputFlow): void

    writeWhileMain(whileFlow: WhileFlow): void

    writeWhileFunction(whileFlow: WhileFlow): void

    addDependencies(dependencies: Set<string>): void;

}
