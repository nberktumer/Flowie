import {WhileFlow} from "../../flows/WhileFlow";
import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";

export interface WhileFlowCode extends FlowCode {

    generateMain(whileFlow: WhileFlow, clazz: Clazz): void

}
