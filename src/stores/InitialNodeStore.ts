import React from "react"
import {InitialFlowNode} from "../components/Flows/Initial/InitialFlowNode"
import {VariableType} from "../models"

interface InitialNodeContextInterface {
    initialNode: InitialFlowNode
}

export const InitialNodeContext = React.createContext<InitialNodeContextInterface>({
    initialNode: new InitialFlowNode(VariableType.NONE, false)
})

export const InitialNodeProvider = InitialNodeContext.Provider
export const InitialNodeConsumer = InitialNodeContext.Consumer
