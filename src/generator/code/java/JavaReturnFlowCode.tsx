import {Clazz} from "../../project/Clazz";
import {ReturnFlowCode} from "../common/ReturnFlowCode";
import {ReturnFlow} from "../../flows/ReturnFlow";

export class JavaReturnFlowCode implements ReturnFlowCode {

    generateMain(returnFlow: ReturnFlow, clazz: Clazz) {
        if (returnFlow.content == null)
            return

        clazz.writeMainCodeFromFlow(returnFlow.nextFlow())
    }
    
}
