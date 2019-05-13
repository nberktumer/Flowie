import {InputFlow} from "../../flows/InputFlow";
import {InputFlowCode} from "../common/InputFlowCode";
import {VariableType} from "../../../models";
import {Func, Parameter} from "../../project/Func";
import {Clazz} from "../../project/Clazz";
import {Code} from "../Code";
import {Project} from "../../project/Project";

export class KotlinInputFlowCode implements InputFlowCode {

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

    generateFunc(inputFlow: InputFlow, clazz: Clazz): void {
        if (inputFlow.content == null)
            return

        const code = new Code(clazz.indentationCount)
        const parameters: Parameter[] = []

        const func = new Func(
            inputFlow.functionName(),
            parameters,
            inputFlow.content.variable.type.toString(),
            code
        )

        Project.codeStrategy.initFunction(func)

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

        Project.codeStrategy.finishFunction(func)
        clazz.addFunction(func)
    }
}
