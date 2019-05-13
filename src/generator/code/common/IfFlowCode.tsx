import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {IfFlow} from "../../flows/IfFlow";

export interface IfFlowCode extends FlowCode {

    generateMain(ifFlow: IfFlow, clazz: Clazz): void

}
