import {CodeStrategy} from "../CodeStrategy";
import {Func, Parameter} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
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
import {DataClazz} from "../../project/DataClazz";
import {KotlinDataClassFlowCode} from "./KotlinDataClassFlowCode";

export class KotlinCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new KotlinArithmeticFlowCode()
    assignmentFlowCode = new KotlinAssignmentFlowCode()
    ifFlowCode = new KotlinIfFlowCode()
    inputFlowCode = new KotlinInputFlowCode()
    outputFlowCode = new KotlinOutputFlowCode()
    randomFlowCode = new KotlinRandomFlowCode()
    whileFlowCode = new KotlinWhileFlowCode()
    dataClassFlowCode = new KotlinDataClassFlowCode()

    initClazz(clazz: Clazz): void {
        clazz.incrementIndentation()
        clazz.incrementIndentation()

        clazz.globalVariableSet.incrementIndentation()
        clazz.globalVariableSet.incrementIndentation()
    }

    finishClazz(clazz: Clazz): void {
        clazz.decrementIndentation()
        clazz.decrementIndentation()
    }

    initClazzCode(clazz: Clazz): void {
        clazz.classInitCode.insert(`class ${clazz.name} {`)

        clazz.classInitCode.incrementIndentation()
        clazz.classFinishCode.incrementIndentation()
        clazz.incrementIndentation()

        clazz.classInitCode.insert(`companion object {`)

        clazz.classInitCode.incrementIndentation()
        clazz.classFinishCode.incrementIndentation()
        clazz.incrementIndentation()
    }

    finishClazzCode(clazz: Clazz): void {
        clazz.classInitCode.decrementIndentation()
        clazz.classFinishCode.decrementIndentation()
        clazz.decrementIndentation()

        clazz.classFinishCode.insert("}")

        clazz.classInitCode.decrementIndentation()
        clazz.classFinishCode.decrementIndentation()
        clazz.decrementIndentation()

        clazz.classFinishCode.insert("}")
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
            mainFunctionLines,
            clazz.type === DirectoryItemType.MAIN_CLASS
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

        if (func.isMain)
            func.code.insert(`@JvmStatic`)

        func.code.insert(`fun ${func.functionName}(${parameterString})${returnTypeString} {`)
        func.code.incrementIndentation()
    }

    finishFunction(func: Func): void {
        func.code.decrementIndentation()
        func.code.insert("}")
        func.code.insert("")
    }

    generateDataClazz(dataClazz: DataClazz): void {
        let variableCode = ""

        dataClazz.variables.forEach((variable, index) => {
            variableCode += `${variable.name} : ${variable.type}`
            if (index !== dataClazz.variables.length - 1) {
                variableCode += ", "
            }
        })

        dataClazz.generatedCode.push(`data class ${dataClazz.name} (${variableCode})`)
    }
}
