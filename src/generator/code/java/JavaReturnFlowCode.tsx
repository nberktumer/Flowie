import {Clazz} from "../../project/Clazz";
import {ReturnFlowCode} from "../common/ReturnFlowCode";
import {ReturnFlow} from "../../flows/ReturnFlow";

export class JavaReturnFlowCode implements ReturnFlowCode {

    generateMain(returnFlow: ReturnFlow, clazz: Clazz) {
        console.log(returnFlow.content)

        if (returnFlow.content == null)
            return

        const returnVariable = returnFlow.content.returnVariable

        console.log(returnVariable)

        if (returnVariable) {
            if (returnVariable.name) {
                clazz.writeCodeToMainFunction(`return ${returnVariable.name};`)
                } else {
                clazz.writeCodeToMainFunction(`return ${returnVariable.value};`)
            }
        } else {
            clazz.writeCodeToMainFunction(`return;`)
        }

        clazz.writeMainCodeFromFlow(returnFlow.nextFlow())
    }

}
