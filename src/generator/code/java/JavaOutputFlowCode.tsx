import {OutputFlow} from "../../flows/OutputFlow";
import {OutputFlowCode} from "../common/OutputFlowCode";
import {Clazz} from "../../project/Clazz";
import {Func} from "../../project/Func";
import {Code} from "../Code";
import {Project} from "../../project/Project";
import {Variable} from "../../../models/Variable";

export class JavaOutputFlowCode implements OutputFlowCode {

    generateMain(outputFlow: OutputFlow, clazz: Clazz): void {
        clazz.writeCodeToMainFunction(`${outputFlow.functionInvocation()};`)
        clazz.writeMainCodeFromFlow(outputFlow.nextFlow())
    }

    generateFunc(outputFlow: OutputFlow, clazz: Clazz): void {
        if (outputFlow.content == null)
            return

        const code = new Code(clazz.indentationCount)

        const parameters: Variable[] = []
        if (outputFlow.content.variable.name) {
            parameters.push(
                new Variable(
                    outputFlow.content.variable.name,
                    outputFlow.content.variable.type,
                    null))
        }

        const func = new Func(
            outputFlow.functionName(),
            parameters,
            undefined,
            code,
            false
        )

        Project.codeStrategy.initFunction(func, clazz)

        let printString = ""

        let newLineCode = ""

        if (outputFlow.content.isNewLine) {
            newLineCode = "System.out.println"
        } else {
            newLineCode = "System.out.print"
        }

        if (!outputFlow.content.variable.name) {
            printString = `${newLineCode}("${outputFlow.content.variable.value}");`
        } else {
            printString = `${newLineCode}("Value of ${outputFlow.content.variable.name} is " + ${outputFlow.content.variable.name});`
        }

        code.insert(printString)
        Project.codeStrategy.finishFunction(func)
        clazz.addFunction(func)
    }
}
