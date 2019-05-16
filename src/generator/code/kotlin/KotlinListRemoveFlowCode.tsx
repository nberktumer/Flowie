import {Clazz} from "../../project/Clazz";
import {ListRemoveFlowCode} from "../common/ListRemoveFlowCode";
import {ListRemoveFlow} from "../../flows/ListRemoveFlow";

export class KotlinListRemoveFlowCode implements ListRemoveFlowCode{

    generateMain(listRemoveFlow: ListRemoveFlow, clazz: Clazz): void {
        if (!listRemoveFlow.content) return

        clazz.writeCodeToMainFunction(listRemoveFlow.content.list.name + ".removeAt(" + listRemoveFlow.content.index + ")")
        clazz.writeMainCodeFromFlow(listRemoveFlow.nextFlow())
    }

}
