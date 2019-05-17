import {Clazz} from "../../project/Clazz";
import {CurrentTimeFlowCode} from "../common/CurrentTimeFlowCode";
import {CurrentTimeFlow} from "../../flows/CurrentTimeFlow";

export class JavaCurrentTimeFlowCode implements CurrentTimeFlowCode {

    generateMain(currentTimeFlow: CurrentTimeFlow, clazz: Clazz) {
        if (currentTimeFlow.content == null)
            return

        let variableSetCode = ""
        if (clazz.addVariable(currentTimeFlow.content.variable.name)) {
            variableSetCode = "Long "
        }

        clazz.writeCodeToMainFunction(
            `${variableSetCode}${currentTimeFlow.content.variable.name} = System.currentTimeMillis();`
        )

        clazz.writeMainCodeFromFlow(currentTimeFlow.nextFlow())
    }

}
