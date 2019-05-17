import {Clazz} from "../../project/Clazz";
import {ListClearFlowCode} from "../common/ListClearFlowCode";
import {ListClearFlow} from "../../flows/ListClearFlow";

export class KotlinListClearFlowCode implements ListClearFlowCode{

    generateMain(listClearFlow: ListClearFlow, clazz: Clazz): void {
        if (!listClearFlow.content) return

        clazz.writeCodeToMainFunction(listClearFlow.content.list.name + ".clear()")
        clazz.writeMainCodeFromFlow(listClearFlow.nextFlow())
    }

}
