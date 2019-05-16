import React from "react"
import {Variable} from "../models/Variable"
import ClassModel from "../models/ClassModel"
import {DataClazz} from "../generator/project/DataClazz"
import ClazzModel from "../models/ClazzModel"

interface FlowContextInterface {
    variableList: Variable[],
    classList: ClazzModel[],
    dataClassList: DataClazz[],
    classNameList: ClassModel[],
    packageNameList: string[]
}

export const FlowContext = React.createContext<FlowContextInterface>({
    variableList: [],
    classList: [],
    dataClassList: [],
    classNameList: [],
    packageNameList: []
})

export const FlowProvider = FlowContext.Provider
export const FlowConsumer = FlowContext.Consumer
