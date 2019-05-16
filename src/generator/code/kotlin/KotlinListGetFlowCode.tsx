import {Clazz} from "../../project/Clazz";
import {ListGetFlowCode} from "../common/ListGetFlowCode";
import {ListGetFlow} from "../../flows/ListGetFlow";

export class KotlinListGetFlowCode implements ListGetFlowCode {

    generateMain(listGetFlow: ListGetFlow, clazz: Clazz): void {
        if (!listGetFlow.content) return

        let setString = ""
        if (listGetFlow.content.setToVariable.name) {
            if (clazz.addVariable(listGetFlow.content.setToVariable.name)) {
                setString = "var "
            } else {
                setString = listGetFlow.content.setToVariable.name
            }
        }

        clazz.writeCodeToMainFunction(`${setString}${listGetFlow.content.setToVariable.name} = ${listGetFlow.content.list.name}.get(${listGetFlow.content.index})`)
        clazz.writeMainCodeFromFlow(listGetFlow.nextFlow())
    }

}
