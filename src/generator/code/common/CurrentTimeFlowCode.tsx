import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {CurrentTimeFlow} from "../../flows/CurrentTimeFlow";

export interface CurrentTimeFlowCode extends FlowCode {

    generateMain(currentTimeFlow: CurrentTimeFlow, clazz: Clazz): void

}
