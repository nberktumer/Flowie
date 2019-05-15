import {DataClassFlowCode} from "../common/DataClassFlowCode";
import {Clazz} from "../../project/Clazz";
import {DataClassFlow} from "../../flows/DataClassFlow";

export class KotlinDataClassFlowCode implements DataClassFlowCode {

    generateMain(dataClassFlow: DataClassFlow, clazz: Clazz): void {
        if (!dataClassFlow.content) return

        const variableCount = dataClassFlow.content.variables.length

        let variableCode = ""
        dataClassFlow.content.variables.forEach((variable, index) => {
            if (variable.value) {
                variableCode += variable.value
            } else {
                variableCode += variable.name
            }

            if (index !== variableCount - 1) {
                variableCode += ", "
            }
        })

        clazz.writeCodeToMainFunction(`val ${dataClassFlow.content.name} = ${dataClassFlow.content.dataClassName}(${variableCode})`)
        clazz.writeMainCodeFromFlow(dataClassFlow.nextFlow())
    }
}
