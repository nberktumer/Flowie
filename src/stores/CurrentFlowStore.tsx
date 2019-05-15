import React from "react"
import {VariableType} from "../models"

interface CurrentFlowContextInterface {
    returnType: VariableType
}

export const CurrentFlowContext = React.createContext<CurrentFlowContextInterface>({
    returnType: VariableType.NONE
})

export const CurrentFlowProvider = CurrentFlowContext.Provider
export const CurrentFlowConsumer = CurrentFlowContext.Consumer
