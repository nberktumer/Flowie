import {Clazz} from "../../project/Clazz";
import {UpdateVariableFlowCode} from "../common/UpdateVariableFlowCode";
import {UpdateVariableFlow} from "../../flows/UpdateVariableFlow";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class KotlinUpdateVariableFlowCode implements UpdateVariableFlowCode {

    generateMain(updateVariableFlow: UpdateVariableFlow, clazz: Clazz): void {
        if (updateVariableFlow.content == null)
            return

        const setFromVariable = updateVariableFlow.content.setFromVariable
        const setToVariable = updateVariableFlow.content.setToVariable

        let variableSetCode = ""

        if (clazz.addVariable(setToVariable.name)) {
            variableSetCode = "var "
        }

        let variableFromCode = ""

        if (setFromVariable.value) {
            if (setFromVariable.name) {
                variableFromCode = setFromVariable.name
            } else {
                variableFromCode = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.KOTLIN, setFromVariable)
            }
        } else {
            variableFromCode += setFromVariable.name
        }

        clazz.writeCodeToMainFunction(variableSetCode + setToVariable.name + " = " + variableFromCode)
        clazz.writeMainCodeFromFlow(updateVariableFlow.nextFlow())
    }

}
