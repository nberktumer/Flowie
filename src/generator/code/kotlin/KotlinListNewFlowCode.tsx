import {NewListFlowCode} from "../common/NewListFlowCode";
import {ListNewFlow} from "../../flows/ListNewFlow";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class KotlinListNewFlowCode implements NewListFlowCode {

    generateMain(newListFlow: ListNewFlow, clazz: Clazz): void {
        if (!newListFlow.content) return

        const varType = newListFlow.content.list.type
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
