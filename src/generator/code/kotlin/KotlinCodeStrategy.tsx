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
import {MainClazz} from "../../project/MainClazz";

export class KotlinCodeStrategy implements CodeStrategy {

    arithmeticFlowCode = new KotlinArithmeticFlowCode()
    assignmentFlowCode = new KotlinAssignmentFlowCode()
    ifFlowCode = new KotlinIfFlowCode()
    inputFlowCode = new KotlinInputFlowCode()
    outputFlowCode = new KotlinOutputFlowCode()
    randomFlowCode = new KotlinRandomFlowCode()
    whileFlowCode = new KotlinWhileFlowCode()

    initClazz(clazz: Clazz): Code {
        return new Code(clazz.identationCount)
    }

    finishClass(clazz: Clazz): Code {
        return new Code(clazz.identationCount)
    }

    initMain(clazz: Clazz): void {
        const parameters: Variable[] = []
        const mainFunctionLines = new Code(clazz.identationCount)

        if (clazz instanceof MainClazz) {
            mainFunctionLines.insert(`fun main(args: Array<String\>) {`)
        } else {
            //TODO
        }

        mainFunctionLines.incrementIdentation()

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

        clazz.mainFunction.code.decrementIdentation()
        clazz.mainFunction.code.insert("}")
        clazz.mainFunction.code.insert("")
    }

    generateFunctionCode(func: Func): void {
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
        func.code.incrementIdentation()

        //TODO ALSO JAVA
        func.code.decrementIdentation()
        func.code.insert("}")
        func.code.insert("")
    }
}
