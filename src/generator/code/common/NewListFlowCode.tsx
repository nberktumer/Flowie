import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {NewListFlow} from "../../flows/NewListFlow";

export interface NewListFlowCode extends FlowCode {

    generateMain(newListFlow: NewListFlow, clazz: Clazz): void

}
