import {Clazz} from "../../project/Clazz";
import {ListGetFlowCode} from "../common/ListGetFlowCode";
import {ListGetFlow} from "../../flows/ListGetFlow";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class KotlinListGetFlowCode implements ListGetFlowCode {

    generateMain(listGetFlow: ListGetFlow, clazz: Clazz): void {
        if (!listGetFlow.content) return

        let setString = ""
        if (listGetFlow.content.setToVariable.name) {
            if (clazz.addVariable(listGetFlow.content.setToVariable.name)) {
                setString = "var " + listGetFlow.content.setToVariable.name
            } else {
                setString = listGetFlow.content.setToVariable.name
            }
        }

        let indexString = ""
        if (listGetFlow.content.index.name) {
            indexString = listGetFlow.content.index.name
        } else {
            indexString = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.KOTLIN, listGetFlow.content.index.value, listGetFlow.content.index.type)
        }

        clazz.writeCodeToMainFunction(`${setString} = ${listGetFlow.content.list.name}.get(${indexString})`)
        clazz.writeMainCodeFromFlow(listGetFlow.nextFlow())
    }

}
