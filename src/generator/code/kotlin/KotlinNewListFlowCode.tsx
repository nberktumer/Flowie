import {NewListFlowCode} from "../common/NewListFlowCode";
import {NewListFlow} from "../../flows/NewListFlow";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class KotlinNewListFlowCode implements NewListFlowCode {

    generateMain(newListFlow: NewListFlow, clazz: Clazz): void {
        if (!newListFlow.content) return

        const varType = newListFlow.content.list.elementType
        const kotlinType = ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.KOTLIN, varType)

        let variableSetCode = ""
        if (clazz.addVariable(newListFlow.content.list.name)) {
            variableSetCode = "var "
        }

        clazz.writeCodeToMainFunction(
            variableSetCode + newListFlow.content.list.name + " = ArrayList<" + kotlinType + ">()"
        )

        clazz.writeMainCodeFromFlow(newListFlow.nextFlow())

    }

}
