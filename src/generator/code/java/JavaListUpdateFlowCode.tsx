import {Clazz} from "../../project/Clazz";
import {ListUpdateFlowCode} from "../common/ListUpdateFlowCode";
import {ListUpdateFlow} from "../../flows/ListUpdateFlow";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class JavaListUpdateFlowCode implements ListUpdateFlowCode {

    generateMain(listUpdateFlow: ListUpdateFlow, clazz: Clazz): void {
        if (!listUpdateFlow.content) return

        clazz.addDependency("import java.util.ArrayList;")

        let addedElementStr = ""
        if (listUpdateFlow.content.element.name) {
            addedElementStr = listUpdateFlow.content.element.name
        } else {
            addedElementStr = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.JAVA, listUpdateFlow.content.element)
        }

        clazz.writeCodeToMainFunction(listUpdateFlow.content.list.name + ".set(" + listUpdateFlow.content.index + "," + addedElementStr + ");")

        clazz.writeMainCodeFromFlow(listUpdateFlow.nextFlow())
    }

}
