import {InputFlow} from "../../flows/InputFlow";
import {InputFlowCode} from "../common/InputFlowCode";
import {VariableType} from "../../../models";
import {Variable} from "../../../models/Variable";
import {Func} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
import {Code} from "../Code";

export class KotlinInputFlowCode implements InputFlowCode {

    generateFunc(inputFlow: InputFlow, clazz: Clazz): void {
        if (inputFlow.content == null)
            return

        const code = new Code(clazz.identationCount)

        code.insert(`println("Please enter value for ${inputFlow.content.variable.name}")`)

        let scanCode = ""
        switch (inputFlow.content.variable.type) {
            case VariableType.INT:
                scanCode = "readLine()!!.toInt()"
                break
            case VariableType.STRING:
                scanCode = "readLine()!!"
                break
            case VariableType.BOOLEAN:
                scanCode = "readLine()!!.toBoolean()"
                break
            case VariableType.DOUBLE:
                scanCode = "readLine()!!.toDouble()"
                break
            default:
                break
        }

        code.insert(`return ${scanCode}`)

        const parameters: Variable[] = []

        const func = new Func(
            inputFlow.functionName(),
            parameters,
            inputFlow.content.variable.type.toString(),
            code
        )

        clazz.functions.push(func)
    }

    generateMain(inputFlow: InputFlow, clazz: Clazz): void {
        if (inputFlow.content == null)
            return

        let variableSetCode = ""
        if (clazz.addVariable(inputFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        clazz.writeCodeToMainFunction(
            `${variableSetCode}${inputFlow.content.variable.name} = ${inputFlow.functionInvocation()}`
        )

        clazz.writeMainCodeFromFlow(inputFlow.nextFlow())
    }

}
