import React from "react"

interface FlowStateContextInterface {
    flowChangedListener: () => void
}

export const FlowStateContext = React.createContext<FlowStateContextInterface>({
    flowChangedListener: () => {}
})

export const FlowStateProvider = FlowStateContext.Provider
export const FlowStateConsumer = FlowStateContext.Consumer
