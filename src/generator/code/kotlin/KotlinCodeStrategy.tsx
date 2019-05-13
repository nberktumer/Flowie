import {CodeStrategy} from "../CodeStrategy";
import {Func} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
import {Variable} from "../../../models/Variable";
import {Code} from "../Code";
import {KotlinArithmeticFlowCode} from "./KotlinArithmeticFlowCode";
import {KotlinAssignmentFlowCode} from "./KotlinAssignmentFlowCode";
import {KotlinIfFlowCode} from "./KotlinIfFlowCode";
import {KotlinInputFlowCode} from "./KotlinInputFlowCode";
import {KotlinOutputFlowCode} from "./KotlinOutputFlowCode";
import {KotlinRandomFlowCode} from "./KotlinRandomFlowCode";
import {KotlinWhileFlowCode} from "./KotlinWhileFlowCode";
import {DirectoryItemType} from "../../project/DirectoryItem";

export class KotlinCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new KotlinArithmeticFlowCode()
    assignmentFlowCode = new KotlinAssignmentFlowCode()
    ifFlowCode = new KotlinIfFlowCode()
    inputFlowCode = new KotlinInputFlowCode()
    outputFlowCode = new KotlinOutputFlowCode()
    randomFlowCode = new KotlinRandomFlowCode()
    whileFlowCode = new KotlinWhileFlowCode()

    initClazz(clazz: Clazz): void {

    }

    finishClazz(clazz: Clazz): void {

    }

    getClazzSignature(clazz: Clazz): string {
        return ""
    }

    initMain(clazz: Clazz): void {
        const parameters: Variable[] = []
        const mainFunctionLines = new Code(clazz.indentationCount)

        if (clazz.type === DirectoryItemType.MAIN_CLASS) {
            mainFunctionLines.insert(`fun main(args: Array<String\>) {`)
        } else {
            //TODO
        }

        mainFunctionLines.incrementIndentation()

        clazz.mainFunction = new Func(
            clazz.name,
            parameters,
            undefined,
            mainFunctionLines
        )
    }

    finishMain(clazz: Clazz): void {
        if (clazz.mainFunction == null)
            throw new Error("Main function is undefined!")

        clazz.mainFunction.code.decrementIndentation()
        clazz.mainFunction.code.insert("}")
        clazz.mainFunction.code.insert("")
    }

    initFunction(func: Func): void {
        let returnTypeString = ""
        if (func.returnType) {
            returnTypeString += ": " + func.returnType
        } else {
            returnTypeString += ""
        }

        let parameterString = ""

        func.parameters.forEach((value, index) => {
            parameterString += `${value.name}: ${value.type}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        func.code.insert(`fun ${func.functionName}(${parameterString})${returnTypeString} {`)
        func.code.incrementIndentation()
    }

    finishFunction(func: Func): void {
        func.code.decrementIndentation()
        func.code.insert("}")
        func.code.insert("")
    }
}
