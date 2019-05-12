import {Clazz} from "../../project/Clazz";
import {FlowCode} from "./FlowCode";
import {OutputFlow} from "../../flows/OutputFlow";

export interface OutputFlowCode extends FlowCode {

    generateMain(outputFlow: OutputFlow, clazz: Clazz): void

    generateFunc(outputFlow: OutputFlow, clazz: Clazz): void

}
