import {AssignmentFlow} from "../../flows/AssignmentFlow";
import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";

export interface AssignmentFlowCode extends FlowCode {

    generateMain(assignmentFlow: AssignmentFlow, clazz: Clazz): void

    generateFunc(assignmentFlow: AssignmentFlow, clazz: Clazz): void

}
