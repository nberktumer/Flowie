import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListClearFlow} from "../../flows/ListClearFlow";

export interface ListClearFlowCode extends FlowCode {

    generateMain(listClearFlow: ListClearFlow, clazz: Clazz): void

}
