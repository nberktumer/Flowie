import {OutputFlow} from "../../flows/OutputFlow";
import {OutputFlowCode} from "../common/OutputFlowCode";
import {Clazz} from "../../project/Clazz";

export class KotlinOutputFlowCode implements OutputFlowCode {

    generateMain(outputFlow: OutputFlow, clazz: Clazz): void {
        if (outputFlow.content == null)
            return

        let printString = ""
        let newLineCode = ""

        if (outputFlow.content.isNewLine) {
            newLineCode = "println"
        } else {
            newLineCode = "print"
        }

        if (!outputFlow.content.variable.name) {
            printString = `${newLineCode}("${outputFlow.content.variable.value}")`
        } else {
            printString = `${newLineCode}("\${${outputFlow.content.variable.name}}")`
        }

        clazz.writeCodeToMainFunction(printString)
        clazz.writeMainCodeFromFlow(outputFlow.nextFlow())
    }

}
