import {OutputFlow} from "../../flows/OutputFlow";
import {OutputFlowCode} from "../common/OutputFlowCode";
import {Clazz} from "../../project/Clazz";
import {Variable} from "../../../models/Variable";
import {Func} from "../../project/Func";
import {Code} from "../Code";

export class KotlinOutputFlowCode implements OutputFlowCode {

    generateFunc(outputFlow: OutputFlow, clazz: Clazz): void {
        if (outputFlow.content == null)
            return

        const code = new Code(clazz.indentationCount)

        const parameters: Variable[] = []
        if (outputFlow.content.variable.name) {
            parameters.push(new Variable(
                outputFlow.content.variable.name,
                outputFlow.content.variable.type,
                undefined
            ))
        }

        const func = new Func(
            outputFlow.functionName(),
            parameters,
            undefined,
            code
        )

        let printString = ""

        if (!outputFlow.content.variable.name) {
            printString = `println("${outputFlow.content.variable.value}")`
        } else {
            printString = `println("Value of ${outputFlow.content.variable.name} is \${${outputFlow.content.variable.name}}")`
        }

        code.insert(printString)
        clazz.functions.push(func)
    }

    generateMain(outputFlow: OutputFlow, clazz: Clazz): void {
        clazz.writeCodeToMainFunction(outputFlow.functionInvocation())
        clazz.writeMainCodeFromFlow(outputFlow.nextFlow())
    }

}
