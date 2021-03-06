import {CodeStrategy} from "../CodeStrategy";
import {Func} from "../../project/Func";
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
import {KotlinReturnFlowCode} from "./KotlinReturnFlowCode";
import {KotlinFunctionalityFlowCode} from "./KotlinFunctionalityFlowCode";
import {Variable} from "../../../models/Variable";
import {KotlinCurrentTimeFlowCode} from "./KotlinCurrentTimeFlowCode";
import {KotlinUpdateVariableFlowCode} from "./KotlinUpdateVariableFlowCode";
import {KotlinListNewFlowCode} from "./KotlinListNewFlowCode";
import {KotlinListAddFlowCode} from "./KotlinListAddFlowCode";
import {KotlinListRemoveFlowCode} from "./KotlinListRemoveFlowCode";
import {KotlinListUpdateFlowCode} from "./KotlinListUpdateFlowCode";
import {KotlinListClearFlowCode} from "./KotlinListClearFlowCode";
import {KotlinListGetFlowCode} from "./KotlinListGetFlowCode";
import {KotlinListSizeFlowCode} from "./KotlinListSizeFlowCode";

export class KotlinCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new KotlinArithmeticFlowCode()
    assignmentFlowCode = new KotlinAssignmentFlowCode()
    ifFlowCode = new KotlinIfFlowCode()
    inputFlowCode = new KotlinInputFlowCode()
    outputFlowCode = new KotlinOutputFlowCode()
    randomFlowCode = new KotlinRandomFlowCode()
    whileFlowCode = new KotlinWhileFlowCode()
    dataClassFlowCode = new KotlinDataClassFlowCode()
    returnFlowCode = new KotlinReturnFlowCode()
    functionalityFlowCode = new KotlinFunctionalityFlowCode()
    currentTimeFlowCode = new KotlinCurrentTimeFlowCode()
    updateVariableFlowCode = new KotlinUpdateVariableFlowCode()
    listNewFlowCode = new KotlinListNewFlowCode()
    listAddFlowCode = new KotlinListAddFlowCode()
    listGetFlowCode = new KotlinListGetFlowCode()
    listSizeFlowCode = new KotlinListSizeFlowCode()
    listRemoveFlowCode = new KotlinListRemoveFlowCode()
    listUpdateFlowCode = new KotlinListUpdateFlowCode()
    listClearFlowCode = new KotlinListClearFlowCode()

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

    initMain(classParameters: Variable[], classReturnType: VariableType, returnTypeIsArray: boolean, clazz: Clazz): void {
        let parameters: Variable[]
        let returnType: VariableType
        const mainFunctionLines = new Code(clazz.indentationCount)
        let mainFnName = ""

        if (clazz.type === DirectoryItemType.MAIN_CLASS) {
            parameters = []
            returnType = VariableType.NONE
            mainFnName = "main"
            parameters.push(
                new Variable(
                    "args",
                    VariableType.MAIN_ARG,
                    null))
        } else {
            parameters = classParameters
            returnType = classReturnType
            mainFnName = clazz.name
        }

        let returnTypeString = ""
        if (returnTypeIsArray) {
            returnTypeString = "ArrayList<" + ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.KOTLIN, returnType) + ">"
        } else {
            returnTypeString = ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.KOTLIN, returnType)
        }

        clazz.mainFunction = new Func(
            mainFnName,
            parameters,
            returnTypeString,
            mainFunctionLines,
            clazz.type === DirectoryItemType.MAIN_CLASS
        )

        this.initFunction(clazz.mainFunction, clazz)
    }

    finishMain(clazz: Clazz): void {
        if (clazz.mainFunction == null)
            throw new Error("Main function is undefined!")

        clazz.mainFunction.code.decrementIndentation()
        clazz.mainFunction.code.insert("}")
        clazz.mainFunction.code.insert("")
    }

    initFunction(func: Func, clazz: Clazz): void {
        let returnTypeString = ""
        if (func.returnType) {
            returnTypeString += ": " + func.returnType
        } else {
            returnTypeString += ""
        }

        let parameterString = ""

        func.parameters.forEach((value, index) => {
            let typeString = ""

            if (value.type === VariableType.LIST && value.listElementType) {
                typeString = "ArrayList<" + ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.KOTLIN, value.listElementType) + ">"
            } else {
                typeString = ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.KOTLIN, value.type)
            }

            parameterString += `${value.name}: ${typeString}`
            if (index !== func.parameters.length - 1) {
                parameterString += ", "
            }
        })

        if (func.isProjectMain)
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
            variableCode += `val ${variable.name} : ${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.KOTLIN, variable.type)}`
            if (index !== dataClazz.variables.length - 1) {
                variableCode += ", "
            }
        })

        dataClazz.code.insert(`data class ${dataClazz.name} (${variableCode})`)
    }
}
