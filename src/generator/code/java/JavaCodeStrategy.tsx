import {CodeStrategy} from "../CodeStrategy";
import {Func, Parameter} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
import {JavaArithmeticFlowCode} from "./JavaArithmeticFlowCode";
import {JavaWhileFlowCode} from "./JavaWhileFlowCode";
import {JavaAssignmentFlowCode} from "./JavaAssignmentFlowCode";
import {JavaIfFlowCode} from "./JavaIfFlowCode";
import {JavaInputFlowCode} from "./JavaInputFlowCode";
import {JavaOutputFlowCode} from "./JavaOutputFlowCode";
import {JavaRandomFlowCode} from "./JavaRandomFlowCode";
import {Code} from "../Code";
import {DirectoryItemType} from "../../project/DirectoryItem";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage, VariableType} from "../../../models";
import {DataClazz} from "../../project/DataClazz";
import {JavaDataClassFlowCode} from "./JavaDataClassFlowCode";
import {JavaReturnFlowCode} from "./JavaReturnFlowCode";
import {JavaFunctionalityFlowCode} from "./JavaFunctionalityFlowCode";

export class JavaCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new JavaArithmeticFlowCode()
    assignmentFlowCode = new JavaAssignmentFlowCode()
    ifFlowCode = new JavaIfFlowCode()
    inputFlowCode = new JavaInputFlowCode()
    outputFlowCode = new JavaOutputFlowCode()
    randomFlowCode = new JavaRandomFlowCode()
    whileFlowCode = new JavaWhileFlowCode()
    dataClassFlowCode = new JavaDataClassFlowCode()
    returnFlowCode = new JavaReturnFlowCode()
    functionalityFlowCode = new JavaFunctionalityFlowCode()

    initClazz(clazz: Clazz): void {
        clazz.incrementIndentation()

        clazz.globalVariableSet.incrementIndentation()
    }

    finishClazz(clazz: Clazz): void {
        clazz.decrementIndentation()
    }

    initClazzCode(clazz: Clazz): void {
        clazz.classInitCode.insert(`public class ${clazz.name} {`)
        clazz.incrementIndentation()
    }

    finishClazzCode(clazz: Clazz): void {
        clazz.decrementIndentation()
        clazz.classFinishCode.insert(`}`)
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
                    ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, VariableType.MAIN_ARG)))
        } else {
            mainFnName = clazz.name
            parameters.push(
                new Parameter(
                    clazz.name,
                    ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, VariableType.MAIN_ARG))) //TODO CHANGE TYPE TO ARG FROM FN
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
            returnTypeString += `${func.returnType}`
        } else {
            returnTypeString += "void"
        }

        let parameterString = ""

        func.parameters.forEach((value, index) => {
            parameterString += `${value.type} ${value.name}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        func.code.insert(`public static ${returnTypeString} ${func.functionName}(${parameterString}) {`)
        func.code.incrementIndentation()
    }

    finishFunction(func: Func): void {
        func.code.decrementIndentation()
        func.code.insert("}")
        func.code.insert("")
    }

    generateDataClazz(dataClazz: DataClazz): void {
        dataClazz.code.insert(`public class ${dataClazz.name} {`)
        dataClazz.code.incrementIndentation()

        dataClazz.variables.forEach((variable) => {
            dataClazz.code.insert(`${ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, variable.type)} ${variable.name};`)
        })

        let variableCode = ""

        dataClazz.variables.forEach((variable, index) => {
            variableCode += `${ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.JAVA, variable.type)} ${variable.name}`
            if (index !== dataClazz.variables.length - 1) {
                variableCode += ", "
            }
        })

        dataClazz.code.insert(`${dataClazz.name}(${variableCode}) {`)
        dataClazz.code.incrementIndentation()

        dataClazz.variables.forEach((variable) => {
            dataClazz.code.insert(`this.${variable.name} = ${variable.name};`)
        })

        dataClazz.code.decrementIndentation()
        dataClazz.code.insert("}")

        dataClazz.code.decrementIndentation()
        dataClazz.code.insert("}")

        dataClazz.generatedCode.push(`data class ${dataClazz.name} (${variableCode})`)
    }
}
