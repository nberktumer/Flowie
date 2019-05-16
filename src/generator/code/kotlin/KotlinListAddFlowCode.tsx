import {Clazz} from "../../project/Clazz";
import {ListAddFlowCode} from "../common/ListAddFlowCode";
import {ListAddFlow} from "../../flows/ListAddFlow";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class KotlinListAddFlowCode implements ListAddFlowCode {

    generateMain(listAddFlow: ListAddFlow, clazz: Clazz): void {
        if (!listAddFlow.content) return

        let addedElementStr = ""
        if (listAddFlow.content.element.name) {
            addedElementStr = listAddFlow.content.element.name
        } else {
            addedElementStr = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.KOTLIN, listAddFlow.content.element.value)
        }

        clazz.writeCodeToMainFunction(listAddFlow.content.list.name + ".add(" + addedElementStr + ")")
        clazz.writeMainCodeFromFlow(listAddFlow.nextFlow())
    }

}
