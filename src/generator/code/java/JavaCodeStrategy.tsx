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
import {Code} from "../Code";
import {DirectoryItemType} from "../../project/DirectoryItem";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage, VariableType} from "../../../models";
import {DataClazz} from "../../project/DataClazz";
import {JavaDataClassFlowCode} from "./JavaDataClassFlowCode";
import {JavaReturnFlowCode} from "./JavaReturnFlowCode";
import {JavaFunctionalityFlowCode} from "./JavaFunctionalityFlowCode";
import {Variable} from "../../../models/Variable";
import {JavaCurrentTimeFlowCode} from "./JavaCurrentTimeFlowCode";

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
    currentTimeFlowCode = new JavaCurrentTimeFlowCode()

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
        const parameters: Variable[] = []
        const mainFunctionLines = new Code(clazz.indentationCount)
        let mainFnName = ""

        if (clazz.type === DirectoryItemType.MAIN_CLASS) {
            mainFnName = "main"
            parameters.push(
                new Variable(
                    "args",
                    VariableType.MAIN_ARG,
                    undefined))
        } else {
            mainFnName = clazz.name
            parameters.push(
                new Variable(
                    clazz.name,
                    VariableType.MAIN_ARG,
                    undefined)) //TODO CHANGE TYPE TO ARG FROM FN
        }

        clazz.mainFunction = new Func(
            mainFnName,
            parameters,
            undefined,
            mainFunctionLines,
            true
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
            parameterString += `${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, value.type)} ${value.name}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        let visibilityString = ""
        if (func.isMain) {
            visibilityString = "public"
        } else {
            visibilityString = "private"
        }

        func.code.insert(`${visibilityString} static ${returnTypeString} ${func.functionName}(${parameterString}) {`)
        func.code.incrementIndentation()
    }

    finishFunction(func: Func): void {
        func.code.decrementIndentation()
        func.code.insert("}")
        func.code.insert("")
    }

    generateDataClazz(dataClazz: DataClazz): void {
        dataClazz.code.insert(`public class ${dataClazz.name} {`)
        dataClazz.code.insert("")
        dataClazz.code.incrementIndentation()

        dataClazz.variables.forEach((variable) => {
            dataClazz.code.insert(`${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, variable.type)} ${variable.name};`)
        })

        let variableCode = ""

        dataClazz.variables.forEach((variable, index) => {
            variableCode += `${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, variable.type)} ${variable.name}`
            if (index !== dataClazz.variables.length - 1) {
                variableCode += ", "
            }
        })

        dataClazz.code.insert("")

        dataClazz.code.insert(`${dataClazz.name}(${variableCode}) {`)
        dataClazz.code.incrementIndentation()

        dataClazz.variables.forEach((variable) => {
            dataClazz.code.insert(`this.${variable.name} = ${variable.name};`)
        })

        dataClazz.code.decrementIndentation()
        dataClazz.code.insert("}")

        dataClazz.code.decrementIndentation()
        dataClazz.code.insert("}")
    }
}
