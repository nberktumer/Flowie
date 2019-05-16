import strings from "../lang"
import {FlowType} from "../models"

interface FlowCategoryInterface {
    name: string,
    flows: FlowType[]
}

export const FlowCategory: FlowCategoryInterface[] = [
    {
        name: strings.variable,
        flows: [FlowType.ASSIGNMENT, FlowType.UPDATE_VARIABLE, FlowType.INPUT, FlowType.DATA_CLASS]
    },
    {
        name: strings.list,
        flows: [FlowType.LIST_NEW, FlowType.LIST_ADD, FlowType.LIST_UPDATE, FlowType.LIST_REMOVE, FlowType.LIST_CLEAR]
    },
    {
        name: strings.util,
        flows: [FlowType.CURRENT_TIME, FlowType.RANDOM, FlowType.OUTPUT]
    },
    {
        name: strings.function,
        flows: [FlowType.CLASS, FlowType.RETURN]
    },
    {
        name: strings.conditional,
        flows: [FlowType.IF, FlowType.WHILE]
    },
    {
        name: strings.operation,
        flows: [FlowType.ARITHMETIC]
    }
]
