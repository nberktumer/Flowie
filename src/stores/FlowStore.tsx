import React from "react"
import {Variable} from "../models/Variable"

interface FlowContextInterface {
    variableList: Variable[]
}

export const FlowContext = React.createContext<FlowContextInterface>({
    variableList: []
})

export const FlowProvider = FlowContext.Provider
export const FlowConsumer = FlowContext.Consumer
