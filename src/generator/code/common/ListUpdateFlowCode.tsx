import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListUpdateFlow} from "../../flows/ListUpdateFlow";

export interface ListUpdateFlowCode extends FlowCode {

    generateMain(listUpdateFlow: ListUpdateFlow, clazz: Clazz): void

}
