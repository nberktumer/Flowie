import {Clazz} from "../../project/Clazz";
import {ListRemoveFlowCode} from "../common/ListRemoveFlowCode";
import {ListRemoveFlow} from "../../flows/ListRemoveFlow";

export class JavaListRemoveFlowCode implements ListRemoveFlowCode{

    generateMain(listRemoveFlow: ListRemoveFlow, clazz: Clazz): void {
        if (!listRemoveFlow.content) return

        clazz.addDependency("import java.util.ArrayList;")
        clazz.writeCodeToMainFunction(listRemoveFlow.content.list.name + ".remove(" + listRemoveFlow.content.index + ");")

        clazz.writeMainCodeFromFlow(listRemoveFlow.nextFlow())
    }

}
