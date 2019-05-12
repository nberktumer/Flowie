import {RandomFlow} from "../../flows/RandomFlow";
import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";

export interface RandomFlowCode extends FlowCode {

    generateMain(randomFlow: RandomFlow, clazz: Clazz): void

    generateFunc(randomFlow: RandomFlow, clazz: Clazz): void

}
