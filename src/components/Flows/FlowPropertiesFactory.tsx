import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {Variable} from "../../models/Variable"
import {WhileProperties} from "./While/WhileProperties"
import {ArithmeticProperties} from "./Arithmetic/ArithmeticProperties"
import {AssignmentProperties} from "./Assignment/AssignmentProperties"
import {InputProperties} from "./Input/InputProperties"
import {OutputProperties} from "./Output/OutputProperties"
import React from "react"
import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {IfProperties} from "./If/IfProperties"
import {RandomProperties} from "./Random/RandomProperties"

export class FlowPropertiesFactory {
    private constructor() {
    }

    static create(type: FlowType | null | undefined, variables: Variable[], onDataChanged: (data: BasePropertiesState) => void, node?: BaseFlowNode): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.IF:
                return (<IfProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<InputProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.RANDOM:
                return (<RandomProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            default:
                return (<div/>)
        }
    }

    static createReadonlyVariableType(type: FlowType | null | undefined, variables: Variable[], onDataChanged: (data: BasePropertiesState) => void, node?: BaseFlowNode): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.IF:
                return (<IfProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties readonlyType variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<InputProperties readonlyType variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.RANDOM:
                return (<RandomProperties readonlyType variables={variables} node={node} onDataChanged={onDataChanged.bind(this)}/>)
            default:
                return (<div/>)
        }
    }
}
