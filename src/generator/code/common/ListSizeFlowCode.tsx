import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListSizeFlow} from "../../flows/ListSizeFlow";

export interface ListSizeFlowCode extends FlowCode {

    generateMain(listSizeFlow: ListSizeFlow, clazz: Clazz): void

}
