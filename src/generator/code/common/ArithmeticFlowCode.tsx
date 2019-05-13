import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ArithmeticFlow} from "../../flows/ArithmeticFlow";

export interface ArithmeticFlowCode extends FlowCode {

    generateMain(arithmeticFlow: ArithmeticFlow, clazz: Clazz): void

}
