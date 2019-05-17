import {FlowCode} from "./FlowCode";
import {Clazz} from "../../project/Clazz";
import {DataClassFlow} from "../../flows/DataClassFlow";

export interface DataClassFlowCode extends FlowCode {

    generateMain(dataClassFlow: DataClassFlow, clazz: Clazz): void

}
