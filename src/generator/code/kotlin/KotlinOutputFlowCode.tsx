import {OutputFlow} from "../../flows/OutputFlow";
import {OutputFlowCode} from "../common/OutputFlowCode";
import {Clazz} from "../../project/Clazz";
import {Func, Parameter} from "../../project/Func";
import {Code} from "../Code";
import {Project} from "../../project/Project";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class KotlinOutputFlowCode implements OutputFlowCode {

    generateMain(outputFlow: OutputFlow, clazz: Clazz): void {
        clazz.writeCodeToMainFunction(outputFlow.functionInvocation())
        clazz.writeMainCodeFromFlow(outputFlow.nextFlow())
    }

    generateFunc(outputFlow: OutputFlow, clazz: Clazz): void {
        if (outputFlow.content == null)
            return

        const code = new Code(clazz.indentationCount)

        const parameters: Parameter[] = []
        if (outputFlow.content.variable.name) {
            parameters.push(new Parameter(
                outputFlow.content.variable.name,
                ProgrammingLanguageTypeConverter.convert(ProgrammingLanguage.KOTLIN, outputFlow.content.variable.type)
            ))
        }

        const func = new Func(
            outputFlow.functionName(),
            parameters,
            undefined,
            code,
            false
        )

        Project.codeStrategy.initFunction(func)

        let printString = ""

        if (!outputFlow.content.variable.name) {
            printString = `println("${outputFlow.content.variable.value}")`
        } else {
            printString = `println("Value of ${outputFlow.content.variable.name} is \${${outputFlow.content.variable.name}}")`
        }

        code.insert(printString)
        Project.codeStrategy.finishFunction(func)

        clazz.addFunction(func)
    }

}
