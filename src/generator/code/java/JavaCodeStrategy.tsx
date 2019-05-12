import {CodeStrategy} from "../CodeStrategy";
import {Func} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
import {JavaArithmeticFlowCode} from "./JavaArithmeticFlowCode";
import {JavaWhileFlowCode} from "./JavaWhileFlowCode";
import {JavaAssignmentFlowCode} from "./JavaAssignmentFlowCode";
import {JavaIfFlowCode} from "./JavaIfFlowCode";
import {JavaInputFlowCode} from "./JavaInputFlowCode";
import {JavaOutputFlowCode} from "./JavaOutputFlowCode";
import {JavaRandomFlowCode} from "./JavaRandomFlowCode";
import {Variable} from "../../../models/Variable";
import {Code} from "../Code";

export class JavaCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new JavaArithmeticFlowCode()
    assignmentFlowCode = new JavaAssignmentFlowCode()
    ifFlowCode = new JavaIfFlowCode()
    inputFlowCode = new JavaInputFlowCode()
    outputFlowCode = new JavaOutputFlowCode()
    randomFlowCode = new JavaRandomFlowCode()
    whileFlowCode = new JavaWhileFlowCode()

    initClazz(clazz: Clazz): void {
        /*
                clazz.mainFunction.functionName =
                    clazz.mainFunction.writeLineToMainFunction(`public class ${clazz.name} {`)
                CodeWriter.getInstance().scopeCount++
        */
    }

    finishClass(clazz: Clazz): void {
        /*
              CodeWriter.getInstance().scopeCount--
               CodeWriter.getInstance().writeLine("}")
               CodeWriter.getInstance().writeLine("")
       */
    }

    initMain(clazz: Clazz): void {
        const parameters: Variable[] = []
        const mainFunctionLines = new Code()
        clazz.mainFunction = new Func(
            "Main",
            parameters,
            undefined,
            mainFunctionLines
        )

        mainFunctionLines.insert(`public static void main(String args[]) {`)
        mainFunctionLines.incrementIdentation()
    }

    finishMain(clazz: Clazz): void {
        if (clazz.mainFunction == null)
            throw new Error("Main function is undefined!")

        clazz.mainFunction.code.decrementIdentation()
        clazz.mainFunction.code.insert("}")
        clazz.mainFunction.code.insert("")
    }

    generateFunctionCode(func: Func) {
        let returnTypeString = ""
        if (func.returnType === undefined) {
            returnTypeString += "void"
        } else {
            returnTypeString += `${func.returnType}`
        }

        let parameterString = ""

        func.parameters.forEach((value, index) => {
            parameterString += `${value.type} ${value.name}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        func.code.insert(`private static ${returnTypeString} ${func.functionName}(${parameterString}) {`)
        func.code.incrementIdentation()

        func.code.decrementIdentation()
        func.code.insert("}")
        func.code.insert("")
    }
}
