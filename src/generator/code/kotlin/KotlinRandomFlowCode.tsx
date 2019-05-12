import {RandomFlow} from "../../flows/RandomFlow";
import {RandomFlowCode} from "../common/RandomFlowCode";
import {Clazz} from "../../project/Clazz";

export class KotlinRandomFlowCode implements RandomFlowCode {

    generateFunc(randomFlow: RandomFlow, clazz: Clazz): void {
    }

    generateMain(randomFlow: RandomFlow, clazz: Clazz): void {

        clazz.addGlobalVariable("val random = Random()")
        clazz.addDependency("import java.util.Random")

        if (randomFlow.content == null)
            return

        let variableSetCode = ""
        if (clazz.addVariable(randomFlow.content.variable.name)) {
            variableSetCode = "var "
        }

        clazz.writeCodeToMainFunction(
            `${variableSetCode}${randomFlow.content.variable.name} = ${randomFlow.content.min} + (${randomFlow.content.max} - ${randomFlow.content.min}) * random.nextDouble()`
        )

        clazz.writeMainCodeFromFlow(randomFlow.nextFlow())
    }

}
