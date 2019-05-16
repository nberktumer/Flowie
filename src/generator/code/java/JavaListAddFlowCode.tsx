import {Clazz} from "../../project/Clazz";
import {ListAddFlowCode} from "../common/ListAddFlowCode";
import {ListAddFlow} from "../../flows/ListAddFlow";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class JavaListAddFlowCode implements ListAddFlowCode {

    generateMain(listAddFlow: ListAddFlow, clazz: Clazz): void {
        if (!listAddFlow.content || !listAddFlow.content.list.listElementType) return

        clazz.addDependency("import java.util.ArrayList;")

        let addedElementStr = ""
        if (listAddFlow.content.element.name) {
            addedElementStr = listAddFlow.content.element.name
        } else {
            addedElementStr = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.JAVA, listAddFlow.content.element.value, listAddFlow.content.list.listElementType)
        }

        clazz.writeCodeToMainFunction(listAddFlow.content.list.name + ".add(" + addedElementStr + ");")
        clazz.writeMainCodeFromFlow(listAddFlow.nextFlow())
    }

}
