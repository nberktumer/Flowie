import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListRemoveFlow} from "../../flows/ListRemoveFlow";

export interface ListRemoveFlowCode extends FlowCode {

    generateMain(listRemoveFlow: ListRemoveFlow, clazz: Clazz): void

}
