import {ListNewFlowCode} from "../common/ListNewFlowCode";
import {ListNewFlow} from "../../flows/ListNewFlow";
import {Clazz} from "../../project/Clazz";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class JavaListNewFlowCode implements ListNewFlowCode {

    generateMain(newListFlow: ListNewFlow, clazz: Clazz): void {
        if (!newListFlow.content || !newListFlow.content.list.listElementType) return

        clazz.addDependency("import java.util.ArrayList;")

        const varType = newListFlow.content.list.listElementType
        const javaType = ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, varType)

        let variableSetCode = ""
        if (clazz.addVariable(newListFlow.content.list.name)) {
            variableSetCode = "ArrayList<" + javaType + "> "
        }

        clazz.writeCodeToMainFunction(
            variableSetCode + newListFlow.content.list.name + " = new ArrayList<>();"
        )

        clazz.writeMainCodeFromFlow(newListFlow.nextFlow())
    }

}
