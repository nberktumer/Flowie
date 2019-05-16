import React from "react"
import {BaseFlowNode} from "../components/CanvasItems/Nodes/BaseFlow/BaseFlowNode"

interface FlowStateContextInterface {
    flowChangedListener: (node: BaseFlowNode) => void
}

export const FlowStateContext = React.createContext<FlowStateContextInterface>({
    flowChangedListener: (node: BaseFlowNode) => {}
})

export const FlowStateProvider = FlowStateContext.Provider
export const FlowStateConsumer = FlowStateContext.Consumer
