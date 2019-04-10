import React, {Component} from "react"
import styles from "./Editor.module.css"
import * as _ from "lodash"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
    import {BaseEvent, BaseModel, DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "nberktumer-react-diagrams"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {FlowType, ProgrammingLanguage} from "../../models"
import {ProjectTreePanel} from "../../components/ProjectTreePanel/ProjectTreePanel"
import {PortFactory} from "../../components/CanvasItems/Ports/PortFactory"
import {RectangleNodeFactory} from "../../components/CanvasItems/Nodes/BaseNodes/RectangleNode/RectangleNodeFactory"
import {RectangleNodeWithInfoFactory} from "../../components/CanvasItems/Nodes/BaseNodes/RectangleNode/RectangleNodeWithInfo/RectangleNodeWithInfoFactory"
import {VariableNodeModel} from "../../components/CanvasItems/Nodes/VariableNode/VariableNodeModel"
import {AddNodeDialog} from "../../components/AddNodeDialog/AddNodeDialog"
import {BaseDialogBodyState} from "../../components/AddNodeDialog/DialogBody/BaseDialogBody"
import {CodeGenerator} from "../../generator/CodeGenerator"
import {
    DefaultPort,
    DefaultPortLocation,
    DefaultPortModel,
    DefaultPortType
} from "../../components/CanvasItems/Ports/DefaultPort"
import {WhileNodeModel} from "../../components/CanvasItems/Nodes/WhileNode/WhileNodeModel"
import {Variable} from "../../models/Variable"
import {Condition} from "../../models/Condition"
import {InitialNodeModel} from "../../components/CanvasItems/Nodes/InitialNode/InitialNodeModel"
import {ArithmeticNodeModel} from "../../components/CanvasItems/Nodes/ArithmeticNode/ArithmeticNodeModel"
import {ArithmeticFlowContent, Operator, OperatorType} from "../../generator/flows/ArithmeticFlow"
import {InputNodeModel} from "../../components/CanvasItems/Nodes/InputNode/InputNodeModel"
import {OutputNodeModel} from "../../components/CanvasItems/Nodes/OutputNode/OutputNodeModel"
import {FlowModel} from "../../generator/FlowModelJSON"
import {AssignmentFlowContent} from "../../generator/flows/AssignmentFlow"
import {InputFlowContent} from "../../generator/flows/InputFlow"
import {OutputFlowContent} from "../../generator/flows/OutputFlow"
import {WhileFlowContent} from "../../generator/flows/WhileFlow"
import {RectangleNodeModel} from "../../components/CanvasItems/Nodes/BaseNodes/RectangleNode/RectangleNodeModel"

export interface IEditorProps {
}

export interface IEditorState {
    height: string | undefined,
    width: string | undefined,
    selectedStr: string,
    isModalOpen: boolean,
    newOperation: FlowType | null,
    newItemPosition: { x: number, y: number },
    generatedCode: string,
    variableList: Variable[]
}

export default class Editor extends Component<IEditorProps, IEditorState> {
    private readonly activeModel: DiagramModel
    private readonly diagramEngine: DiagramEngine
    private readonly selected: string[] = []
    private readonly initialNode: InitialNodeModel

    constructor(props: any) {
        super(props)

        this.diagramEngine = new DiagramEngine()
        this.diagramEngine.installDefaultFactories()

        this.diagramEngine.registerNodeFactory(new RectangleNodeFactory())
        this.diagramEngine.registerNodeFactory(new RectangleNodeWithInfoFactory())
        this.diagramEngine.registerPortFactory(new PortFactory("default", () => new DefaultPortModel(
            new DefaultPort(DefaultPortType.IN, DefaultPortLocation.LEFT), "unknown")))

        this.activeModel = new DiagramModel()
        this.diagramEngine.setDiagramModel(this.activeModel)

        _.forEach(this.activeModel.getNodes(), (item) => {
            item.addListener({
                selectionChanged: this.addItemListener.bind(this)
            })
        })

        this.initialNode = new InitialNodeModel()
        this.initialNode.addListener({
            selectionChanged: this.addItemListener.bind(this),
            entityRemoved: this.removeItemListener.bind(this)
        })

        const generator = new CodeGenerator("[]")

        this.diagramEngine.getDiagramModel().addNode(this.initialNode)

        this.state = {
            height: "1px",
            width: "1px",
            selectedStr: "Nothing is selected!",
            isModalOpen: false,
            newOperation: null,
            newItemPosition: {x: 0, y: 0},
            generatedCode: generator.generate(),
            variableList: []
        }
    }

    onDrop(event: any): void {
        const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"))

        if (!Object.values(FlowType).includes(data.type))
            return

        const points = this.diagramEngine.getRelativeMousePoint(event)

        this.setState({
            isModalOpen: true,
            newOperation: data.type,
            newItemPosition: points
        })
    }

    addItem(data: BaseDialogBodyState): void {
        let node = null

        switch (this.state.newOperation) {
            case FlowType.ASSIGNMENT: {
                if (data.variableName === "" || data.variableType === "" || data.value === "")
                    return

                // data.isNull
                const variable = new Variable(data.variableName, data.variableType, data.value)

                node = new VariableNodeModel(variable)
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = data.variableName + " = " + data.value

                // Add the new variable to the variable list
                this.state.variableList.push(variable)

                break
            }
            case FlowType.ARITHMETIC: {
                if (data.variable === "" || data.operation === "" || data.operator1 === "" || data.operator2 === "")
                    return

                const var1 = JSON.parse(data.operator1) as Variable
                const var2 = JSON.parse(data.operator2) as Variable

                const op1 = new Operator(OperatorType.VARIABLE, var1.name, var1.value)
                const op2 = new Operator(OperatorType.VARIABLE, var2.name, var2.value)

                node = new ArithmeticNodeModel(
                    JSON.parse(data.variable),
                    data.operation,
                    op1,
                    op2
                )
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = data.operation
                break
            }
            case FlowType.WHILE: {
                if (data.variableType === "" || data.first === "" || data.second === "" || data.operation === "")
                    return

                const condition = new Condition(data.variableType, JSON.parse(data.first), JSON.parse(data.second), data.operation)

                node = new WhileNodeModel()
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.conditionList.push(condition)
                node.info = condition.first.name + " " + condition.operation + " " + condition.second.name
                break
            }
            case FlowType.INPUT: {
                if (data.variableName === "" || data.variableType === "")
                    return

                const variable = new Variable(data.variableName, data.variableType, null)

                node = new InputNodeModel(variable)
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = data.variableName

                // Add the new variable to the variable list
                this.state.variableList.push(variable)
                break
            }
            case FlowType.OUTPUT: {
                if (data.variable === "")
                    return

                node = new OutputNodeModel(JSON.parse(data.variable))
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = node.variable.name === undefined ? "" : node.variable.name
                break
            }
            default:
                return
        }

        node.x = this.state.newItemPosition.x
        node.y = this.state.newItemPosition.y

        node.addListener({
            selectionChanged: this.addItemListener.bind(this),
            entityRemoved: this.removeItemListener.bind(this)
        })

        this.diagramEngine.getDiagramModel().addNode(node)
        this.forceUpdate()
    }

    onModalSaveClick(data: BaseDialogBodyState | null) {
        this.onModalClose()
        if (data != null)
            this.addItem(data)
    }

    onModalDismissClick() {
        this.onModalClose()
    }

    onModalClose() {
        this.setState({
            isModalOpen: false,
            newOperation: null
        })
    }

    onLinkChanged() {
        const currentFlow = this.initialNode.getNextFlow()
        // clear the code preview and return if the initial node link has deleted
        if (currentFlow == null) {
            const generator = new CodeGenerator("[]")
            this.setState({generatedCode: generator.generate()})
        } else {
            const flowModelList: FlowModel[] = []
            this.generateFlowModel(currentFlow, flowModelList, 0)

            const generator = new CodeGenerator(JSON.stringify(flowModelList))
            this.setState({generatedCode: generator.generate()})
        }
    }

    render() {
        return (
            <div className={styles.App}>
                <AddNodeDialog onSaveClick={this.onModalSaveClick.bind(this)}
                               onDismissClick={this.onModalDismissClick.bind(this)}
                               onClose={this.onModalClose.bind(this)}
                               aria-labelledby="simple-dialog-title"
                               variables={this.state.variableList}
                               open={this.state.isModalOpen}
                               type={this.state.newOperation}/>

                <ReflexContainer orientation="vertical">
                    <ReflexElement minSize={250}>
                        <ReflexContainer orientation="horizontal" style={{height: "100vh"}}>
                            <ReflexElement className="left-pane" flex={0.35} minSize={200}>
                                <div style={{width: "100%", height: "100%", backgroundColor: "#1d1f21"}}>
                                    <ProjectTreePanel/>
                                </div>
                            </ReflexElement>

                            <ReflexSplitter/>

                            <ReflexElement className="left-pane" minSize={200}>
                                <ShapePanel>
                                    {Object.values(FlowType).map((value) => (
                                        <ShapeItem key={value} model={{type: value}} name={value}/>
                                    ))}
                                </ShapePanel>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>

                    <ReflexSplitter/>

                    <ReflexElement className="middle-pane" flex={0.55} minSize={250}>
                        <div className={styles.paneContent}>
                            <div
                                className={styles.diagramLayer}
                                onDrop={(event) => this.onDrop(event)}
                                onDragOver={(event) => event.preventDefault()}>

                                <DiagramWidget
                                    maxNumberPointsPerLink={0}
                                    allowLooseLinks={false}
                                    className={styles.srdDemoCanvas}
                                    diagramEngine={this.diagramEngine}/>
                            </div>
                        </div>
                    </ReflexElement>

                    <ReflexSplitter/>

                    <ReflexElement minSize={250}>
                        <ReflexContainer orientation="horizontal" style={{height: "100vh"}}>
                            <ReflexElement className="right-pane" flex={0.5} minSize={200}>
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "#1d1f21",
                                        color: "white"
                                    }}>
                                    {this.state.selectedStr}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter/>

                            <ReflexElement className="right-pane" minSize={100}>
                                <CodePreviewPanel code={this.state.generatedCode}
                                                  language={ProgrammingLanguage.TYPESCRIPT}/>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                </ReflexContainer>
            </div>
        )
    }

    private generateFlowModel(currentFlow: RectangleNodeModel | null, flowModelList: FlowModel[], depth: number, scopeId: string | null = null) {
        if (currentFlow == null || (scopeId != null && currentFlow.getID() === scopeId))
            return

        let flowModel
        const currentFlowId = depth === 0 ? "INITIAL_ID" : currentFlow.getID()
        const nextFlow = currentFlow.getNextFlow()
        const nextFlowId = nextFlow == null ? null : nextFlow.getID()

        switch (currentFlow.constructor) {
            case VariableNodeModel: {
                const nodeModel = currentFlow as VariableNodeModel
                flowModel = new FlowModel(
                    FlowType.ASSIGNMENT,
                    currentFlowId,
                    new AssignmentFlowContent(nodeModel.variable),
                    null,
                    null,
                    null,
                    null,
                    nextFlowId
                )
                break
            }
            case ArithmeticNodeModel: {
                const nodeModel = currentFlow as ArithmeticNodeModel
                flowModel = new FlowModel(
                    FlowType.ARITHMETIC,
                    currentFlowId,
                    null,
                    null,
                    null,
                    new ArithmeticFlowContent(
                        nodeModel.variable,
                        nodeModel.operation,
                        nodeModel.operator1,
                        nodeModel.operator2
                    ),
                    null,
                    nextFlowId
                )
                break
            }
            case WhileNodeModel: {
                const nodeModel = currentFlow as WhileNodeModel
                const scopeFlow = nodeModel.getScopeFlow()

                this.generateFlowModel(scopeFlow, flowModelList, depth++, nodeModel.getID())

                flowModel = new FlowModel(
                    FlowType.WHILE,
                    currentFlowId,
                    null,
                    null,
                    null,
                    null,
                    new WhileFlowContent(
                        nodeModel.conditionList,
                        scopeFlow == null ? null : scopeFlow.getID()
                    ),
                    nextFlowId
                )
                break
            }
            case InputNodeModel: {
                const nodeModel = currentFlow as InputNodeModel
                flowModel = new FlowModel(
                    FlowType.INPUT,
                    currentFlowId,
                    null,
                    new InputFlowContent(nodeModel.variable),
                    null,
                    null,
                    null,
                    nextFlowId
                )
                break
            }
            case OutputNodeModel: {
                const nodeModel = currentFlow as OutputNodeModel
                flowModel = new FlowModel(
                    FlowType.OUTPUT,
                    currentFlowId,
                    null,
                    null,
                    new OutputFlowContent(nodeModel.variable),
                    null,
                    null,
                    nextFlowId
                )
                break
            }
            default:
                break
        }

        if (flowModel !== undefined)
            flowModelList.push(flowModel)
        this.generateFlowModel(currentFlow.getNextFlow(), flowModelList, depth + 1, scopeId)
    }

    private addItemListener(item: any) {
        if (item.isSelected && this.selected.indexOf((item.entity as DefaultNodeModel).name) === -1) {
            this.selected.push((item.entity as DefaultNodeModel).name)
            this.setState({
                selectedStr: this.selected.join(", ") +
                    (this.selected.length === 1 ? " is " : " are ") + "selected."
            })
        } else if (!item.isSelected) {
            const index = this.selected.indexOf((item.entity as DefaultNodeModel).name)
            this.selected.splice(index, 1)

            if (this.selected.length === 0) {
                this.setState({selectedStr: "Nothing is selected!"})
            } else {
                this.setState({
                    selectedStr: this.selected.join(", ") +
                        (this.selected.length === 1 ? " is " : " are ") + "selected."
                })
            }
        }
    }

    private removeItemListener(event: BaseEvent<BaseModel>) {
        if (event.entity instanceof VariableNodeModel || event.entity instanceof InputNodeModel) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as VariableNodeModel).variable.name
            })

            this.setState({variableList: newVariableList})
        }

        const index = this.selected.indexOf((event.entity as DefaultNodeModel).name)
        this.selected.splice(index, 1)

        if (this.selected.length === 0) {
            this.setState({selectedStr: "Nothing is selected!"})
        } else {
            this.setState({
                selectedStr: this.selected.join(", ") +
                    (this.selected.length === 1 ? " is " : " are ") + "selected."
            })
        }
    }
}
