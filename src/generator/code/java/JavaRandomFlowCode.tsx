import {RandomFlow} from "../../flows/RandomFlow";
import {RandomFlowCode} from "../common/RandomFlowCode";
import {Clazz} from "../../project/Clazz";

export class JavaRandomFlowCode implements RandomFlowCode {

    generateMain(randomFlow: RandomFlow, clazz: Clazz) {
        if (randomFlow.content == null)
            return

        clazz.addGlobalVariable("static Random random = new Random();")
        clazz.addDependency("import java.util.Random;")

        let variableSetCode = ""
        if (clazz.addVariable(randomFlow.content.variable.name)) {
            variableSetCode = "Double "
        }

        clazz.writeCodeToMainFunction(
            `${variableSetCode}${randomFlow.content.variable.name} = ${randomFlow.content.min} + (${randomFlow.content.max} - ${randomFlow.content.min}) * random.nextDouble();`
        )

        clazz.writeMainCodeFromFlow(randomFlow.nextFlow())
    }

}
