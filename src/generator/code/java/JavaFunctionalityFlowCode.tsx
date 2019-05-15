import {Clazz} from "../../project/Clazz";
import {FunctionalityFlow} from "../../flows/FunctionalityFlow";
import {FunctionalityFlowCode} from "../common/FunctionalityFlowCode";

export class JavaFunctionalityFlowCode implements FunctionalityFlowCode {

    generateMain(functionalityFlow: FunctionalityFlow, clazz: Clazz): void {
        if (!functionalityFlow.content) return

        clazz.writeMainCodeFromFlow(functionalityFlow.nextFlow())
    }

}
