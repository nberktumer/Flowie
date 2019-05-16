import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListAddFlow} from "../../flows/ListAddFlow";

export interface ListAddFlowCode extends FlowCode {

    generateMain(listAddFlow: ListAddFlow, clazz: Clazz): void

}
