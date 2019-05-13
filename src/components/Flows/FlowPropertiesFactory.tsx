import {FlowType} from "../../models"
import {BasePropertiesState} from "./Base/BaseProperties"
import {WhileProperties} from "./While/WhileProperties"
import {ArithmeticProperties} from "./Arithmetic/ArithmeticProperties"
import {AssignmentProperties} from "./Assignment/AssignmentProperties"
import {InputProperties} from "./Input/InputProperties"
import {OutputProperties} from "./Output/OutputProperties"
import React from "react"
import {BaseFlowNode} from "../CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {IfProperties} from "./If/IfProperties"
import {RandomProperties} from "./Random/RandomProperties"
import {DataClassProperties} from "./DataClass/DataClassProperties"

export class FlowPropertiesFactory {
    private constructor() {
    }

    static create(type: FlowType | null | undefined, onDataChanged: (data: BasePropertiesState) => void, node?: BaseFlowNode): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.IF:
                return (<IfProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<InputProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.RANDOM:
                return (<RandomProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.DATA_CLASS:
                return (<DataClassProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            default:
                return (<div/>)
        }
    }

    static createReadonlyVariableType(type: FlowType | null | undefined, onDataChanged: (data: BasePropertiesState) => void, node?: BaseFlowNode): JSX.Element {
        switch (type) {
            case FlowType.WHILE:
                return (<WhileProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.IF:
                return (<IfProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ARITHMETIC:
                return (<ArithmeticProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.ASSIGNMENT:
                return (<AssignmentProperties readonlyType node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.INPUT:
                return (<InputProperties readonlyType node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.OUTPUT:
                return (<OutputProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.RANDOM:
                return (<RandomProperties readonlyType node={node} onDataChanged={onDataChanged.bind(this)}/>)
            case FlowType.DATA_CLASS:
                return (<DataClassProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
            default:
                return (<div/>)
        }
    }
    //
    // static createFileProperties(type: FlowType | null | undefined): JSX.Element {
    //     switch (type) {
    //         case FlowType.DATA_CLASS:
    //             return (<DataClassProperties node={node} onDataChanged={onDataChanged.bind(this)}/>)
    //         default:
    //             return (<div/>)
    //     }
    // }
}
