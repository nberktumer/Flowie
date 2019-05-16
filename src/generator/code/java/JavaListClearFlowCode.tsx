import {Clazz} from "../../project/Clazz";
import {ListClearFlowCode} from "../common/ListClearFlowCode";
import {ListClearFlow} from "../../flows/ListClearFlow";

export class JavaListClearFlowCode implements ListClearFlowCode {

    generateMain(listClearFlow: ListClearFlow, clazz: Clazz): void {
        if (!listClearFlow.content) return

        clazz.addDependency("import java.util.ArrayList;")

        clazz.writeCodeToMainFunction(listClearFlow.content.list.name + ".clear();")
        clazz.writeMainCodeFromFlow(listClearFlow.nextFlow())
    }

}
