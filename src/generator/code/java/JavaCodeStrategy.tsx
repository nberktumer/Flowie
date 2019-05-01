import {CodeStrategy} from "../CodeStrategy";
import {Func} from "../../Func";
import {CodeWriter} from "../CodeWriter";
import {ArithmeticFlow, ArithmeticFlowContent} from "../../flows/ArithmeticFlow";
import {InputFlow, InputFlowContent} from "../../flows/InputFlow";
import {OutputFlow, OutputFlowContent} from "../../flows/OutputFlow";
import {WhileFlow, WhileFlowContent} from "../../flows/WhileFlow";
import {AssignmentFlow} from "../../flows/AssignmentFlow";

export class JavaCodeStrategy implements CodeStrategy {
    initMain(): void {
        CodeWriter.getInstance().writeLineToMainFunction(`public class Test {`)
        CodeWriter.getInstance().scopeCount++

        CodeWriter.getInstance().writeLineToMainFunction(`public static void main(String args[]) {`)
        CodeWriter.getInstance().scopeCount++

    }

    finishMain(): void {
        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLineToMainFunction("}")
        CodeWriter.getInstance().scopeCount--
        CodeWriter.getInstance().writeLineToMainFunction("}")
    }

    writeArithmeticFunction(arithmeticFlow: ArithmeticFlow): void {
    }

    writeArithmeticMain(arithmeticFlow: ArithmeticFlow): void {
    }

    writeAssignmentFunction(assignmentFlow: AssignmentFlow): void {
    }

    writeAssignmentMain(assignmentFlow: AssignmentFlow): void {
    }

    writeFunctionSignature(func: Func): void {
    }

    writeInputFunction(inputFlow: InputFlow): void {
    }

    writeInputMain(inputFlow: InputFlow): void {
    }

    writeOutputFunction(outputFlow: OutputFlow): void {
    }

    writeOutputMain(outputFlow: OutputFlow): void {
    }

    writeWhileFunction(whileFlow: WhileFlow): void {
    }

    writeWhileMain(whileFlow: WhileFlow): void {
    }
}
