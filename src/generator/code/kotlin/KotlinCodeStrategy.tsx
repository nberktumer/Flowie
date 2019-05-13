import {CodeStrategy} from "../CodeStrategy";
import {Func, Parameter} from "../../project/Func";
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
import {ProgrammingLanguage, VariableType} from "../../../models";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";

export class KotlinCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new KotlinArithmeticFlowCode()
    assignmentFlowCode = new KotlinAssignmentFlowCode()
    ifFlowCode = new KotlinIfFlowCode()
    inputFlowCode = new KotlinInputFlowCode()
    outputFlowCode = new KotlinOutputFlowCode()
    randomFlowCode = new KotlinRandomFlowCode()
    whileFlowCode = new KotlinWhileFlowCode()

    initClazz(clazz: Clazz): void {
        clazz.classCode.insert(`class ${clazz.name}`)
        clazz.incrementIndentation()
        clazz.classCode.insert(`companion object {`)
        clazz.incrementIndentation()
    }

    finishClazz(clazz: Clazz): void {
        clazz.decrementIndentation()
        clazz.classCode.insert("}")
        clazz.decrementIndentation()
        clazz.classCode.insert("}")
    }

    initMain(clazz: Clazz): void {
        const parameters: Parameter[] = []
        const mainFunctionLines = new Code(clazz.indentationCount)
        let mainFnName = ""

        if (clazz.type === DirectoryItemType.MAIN_CLASS) {
            mainFnName = "main"
            parameters.push(
                new Parameter(
                    "args",
                    ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.KOTLIN, VariableType.MAIN_ARG)))
        } else {
            mainFnName = clazz.name
            parameters.push(
                new Parameter(
                    clazz.name,
                    ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.KOTLIN, VariableType.MAIN_ARG))) //TODO CHANGE TYPE TO ARG FROM FN
        }

        clazz.mainFunction = new Func(
            mainFnName,
            parameters,
            undefined,
            mainFunctionLines
        )

        this.initFunction(clazz.mainFunction)
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
