import {InputFlow} from "../../flows/InputFlow";
import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";

export interface InputFlowCode extends FlowCode {

    generateMain(inputFlow: InputFlow, clazz: Clazz): void

    generateFunc(inputFlow: InputFlow, clazz: Clazz): void

}
