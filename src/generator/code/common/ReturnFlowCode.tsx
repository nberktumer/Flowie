import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ReturnFlow} from "../../flows/ReturnFlow";

export interface ReturnFlowCode extends FlowCode {

    generateMain(whileFlow: ReturnFlow, clazz: Clazz): void

}
