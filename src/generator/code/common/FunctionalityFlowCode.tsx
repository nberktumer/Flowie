import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {FunctionalityFlow} from "../../flows/FunctionalityFlow";

export interface FunctionalityFlowCode extends FlowCode {

    generateMain(functionalityFlow: FunctionalityFlow, clazz: Clazz): void

}
