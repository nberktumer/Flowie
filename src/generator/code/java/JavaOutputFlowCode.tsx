import {OutputFlow} from "../../flows/OutputFlow";
import {OutputFlowCode} from "../common/OutputFlowCode";
import {Clazz} from "../../project/Clazz";

export class JavaOutputFlowCode implements OutputFlowCode {

    generateMain(outputFlow: OutputFlow, clazz: Clazz): void {
        if (outputFlow.content == null)
            return

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
            printString = `${newLineCode}(${outputFlow.content.variable.name});`
        }

        clazz.writeCodeToMainFunction(printString)
        clazz.writeMainCodeFromFlow(outputFlow.nextFlow())
    }
}
