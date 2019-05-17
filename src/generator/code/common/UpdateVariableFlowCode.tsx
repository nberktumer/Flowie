import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {UpdateVariableFlow} from "../../flows/UpdateVariableFlow";

export interface UpdateVariableFlowCode extends FlowCode {

    generateMain(updateVariableFlow: UpdateVariableFlow, clazz: Clazz): void

}
