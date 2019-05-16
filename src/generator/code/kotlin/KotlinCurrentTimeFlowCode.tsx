import {Clazz} from "../../project/Clazz";
import {CurrentTimeFlowCode} from "../common/CurrentTimeFlowCode";
import {CurrentTimeFlow} from "../../flows/CurrentTimeFlow";

export class KotlinCurrentTimeFlowCode implements CurrentTimeFlowCode {

    generateMain(currentTimeFlow: CurrentTimeFlow, clazz: Clazz) {
        if (currentTimeFlow.content == null)
            return

        let variableDecleration = ""
        if (clazz.addVariable(currentTimeFlow.content.variable.name)) {
            variableDecleration = "var "
        }

        clazz.writeCodeToMainFunction(
            `${variableDecleration}${currentTimeFlow.content.variable.name} = System.currentTimeMillis()`
        )

        clazz.writeMainCodeFromFlow(currentTimeFlow.nextFlow())
    }

}
