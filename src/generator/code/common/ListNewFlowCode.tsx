import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListNewFlow} from "../../flows/ListNewFlow";

export interface ListNewFlowCode extends FlowCode {

    generateMain(newListFlow: ListNewFlow, clazz: Clazz): void

}
