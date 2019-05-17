import {Clazz} from "../../project/Clazz";
import {ListGetFlowCode} from "../common/ListGetFlowCode";
import {ListGetFlow} from "../../flows/ListGetFlow";
import {ProgrammingLanguageTypeConverter} from "../ProgrammingLanguageTypeConverter";
import {ProgrammingLanguage} from "../../../models";

export class JavaListGetFlowCode implements ListGetFlowCode {

    generateMain(listGetFlow: ListGetFlow, clazz: Clazz): void {
        if (!listGetFlow.content || !listGetFlow.content.list.listElementType) return

        clazz.addDependency("import java.util.ArrayList;")

        let setString = ""
        if (listGetFlow.content.setToVariable.name) {
            if (clazz.addVariable(listGetFlow.content.setToVariable.name)) {
                setString = `${ProgrammingLanguageTypeConverter.convertType(ProgrammingLanguage.JAVA, listGetFlow.content.setToVariable.type)} ${listGetFlow.content.setToVariable.name}`
            } else {
                setString = `${listGetFlow.content.setToVariable.name}`
            }
        }

        let indexString = ""
        if (listGetFlow.content.index.name) {
            indexString = listGetFlow.content.index.name
        } else {
            indexString = ProgrammingLanguageTypeConverter.convertConstantVariable(ProgrammingLanguage.JAVA, listGetFlow.content.index.value, listGetFlow.content.index.type)
        }

        clazz.writeCodeToMainFunction(`${setString} = ${listGetFlow.content.list.name}.get(${indexString});`)
        clazz.writeMainCodeFromFlow(listGetFlow.nextFlow())
    }

}
