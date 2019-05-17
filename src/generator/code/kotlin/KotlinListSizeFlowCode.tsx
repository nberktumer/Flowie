import {Clazz} from "../../project/Clazz";
import {ListSizeFlowCode} from "../common/ListSizeFlowCode";
import {ListSizeFlow} from "../../flows/ListSizeFlow";

export class KotlinListSizeFlowCode implements ListSizeFlowCode {

    generateMain(listSizeFlow: ListSizeFlow, clazz: Clazz): void {
        if (!listSizeFlow.content) return

        let setString = ""
        if (listSizeFlow.content.setToVariable.name) {
            if (clazz.addVariable(listSizeFlow.content.setToVariable.name)) {
                setString = `var ${listSizeFlow.content.setToVariable.name} `
            } else {
                setString = `${listSizeFlow.content.setToVariable.name} `
            }
        }

        clazz.writeCodeToMainFunction(`${setString}= ${listSizeFlow.content.list.name}.size`)
        clazz.writeMainCodeFromFlow(listSizeFlow.nextFlow())
    }

}
