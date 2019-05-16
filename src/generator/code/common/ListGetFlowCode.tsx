import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListGetFlow} from "../../flows/ListGetFlow";

export interface ListGetFlowCode extends FlowCode {

    generateMain(listGetFlow: ListGetFlow, clazz: Clazz): void

}
