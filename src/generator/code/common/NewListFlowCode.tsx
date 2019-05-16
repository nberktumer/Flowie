import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {ListNewFlow} from "../../flows/ListNewFlow";

export interface NewListFlowCode extends FlowCode {

    generateMain(newListFlow: ListNewFlow, clazz: Clazz): void

}
