import {OutputFlow} from "../../flows/OutputFlow";
import {OutputFlowCode} from "../common/OutputFlowCode";
import {Clazz} from "../../project/Clazz";
import {Variable} from "../../../models/Variable";
import {Func} from "../../project/Func";
import {Code} from "../Code";
import {Project} from "../../project/Project";

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
                    undefined))
        }

        const func = new Func(
            outputFlow.functionName(),
            parameters,
            undefined,
            code
        )

        Project.codeStrategy.initFunction(func)

        let printString = ""

        if (!outputFlow.content.variable.name) {
            printString = `System.out.println("${outputFlow.content.variable.value}");`
        } else {
            printString = `System.out.println("Value of ${outputFlow.content.variable.name} is " + ${outputFlow.content.variable.name});`
        }

        code.insert(printString)
        Project.codeStrategy.finishFunction(func)
        clazz.addFunction(func)
    }
}
