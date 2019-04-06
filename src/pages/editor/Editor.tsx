import React, {Component} from "react"
import styles from "./Editor.module.css"
import * as _ from "lodash"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
import {BaseEvent, BaseModel, DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "storm-react-diagrams"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {FlowType, ProgrammingLanguage, VariableType} from "../../models"
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

const json = "[" +
    "  {" +
    "    \"id\": 0," +
    "    \"type\": \"Assignment\"," +
    "    \"assignmentFlowContent\": {" +
    "      \"variable\": {" +
    "        \"name\": \"total\"," +
    "        \"value\": \"1\"," +
    "        \"type\": \"Int\"" +
    "      }," +
    "      \"nextFlowId\": 1" +
    "    }" +
    "  }," +
    "  {" +
    "    \"id\": 1," +
    "    \"type\": \"Input\"," +
    "    \"inputFlowContent\": {" +
    "      \"variable\": {" +
    "        \"name\": \"n\"," +
    "        \"type\": \"Int\"" +
    "      }," +
    "      \"nextFlowId\": 2" +
    "    }" +
    "  }," +
    "  {" +
    "    \"id\": 2," +
    "    \"type\": \"While\"," +
    "    \"whileFlowContent\": {" +
    "      \"conditions\": [" +
    "        {" +
    "          \"variableType\": \"Int\"," +
    "          \"first\": {" +
    "            \"name\": \"n\"" +
    "          }," +
    "          \"second\": {" +
    "            \"name\": 1" +
    "          }," +
    "          \"operation\": \"NotEquals\"" +
    "        }" +
    "      ]," +
    "      \"scopeId\": 3," +
    "      \"nextFlowId\": 5" +
    "    }" +
    "  }," +
    "  {" +
    "    \"id\": 3," +
    "    \"type\": \"Arithmetic\"," +
    "    \"arithmeticFlowContent\": {" +
    "      \"variable\": {" +
    "        \"name\": \"total\"" +
    "      }," +
    "      \"operation\": \"Multiplication\"," +
    "      \"operator1\": {" +
    "        \"type\": \"Variable\"," +
    "        \"variableName\": \"n\"" +
    "      }," +
    "      \"operator2\": {" +
    "        \"type\": \"Variable\"," +
    "        \"variableName\": \"total\"" +
    "      }," +
    "      \"nextFlowId\": 4" +
    "    }" +
    "  }," +
    "  {" +
    "    \"id\": 4," +
    "    \"type\": \"Arithmetic\"," +
    "    \"arithmeticFlowContent\": {" +
    "      \"variable\": {" +
    "        \"name\": \"n\"" +
    "      }," +
    "      \"operation\": \"Subtraction\"," +
    "      \"operator1\": {" +
    "        \"type\": \"Variable\"," +
    "        \"variableName\": \"n\"" +
    "      }," +
    "      \"operator2\": {" +
    "        \"type\": \"Constant\"," +
    "        \"constantValue\": 1" +
    "      }," +
    "      \"nextFlowId\": 2" +
    "    }" +
    "  }," +
    "  {" +
    "    \"id\": 5," +
    "    \"type\": \"Output\"," +
    "    \"outputFlowContent\": {" +
    "      \"variable\": {" +
    "        \"name\": \"total\"," +
    "        \"type\": \"Int\"" +
    "      }," +
    "      \"nextFlowId\": -1" +
    "    }" +
    "  }" +
    "]"

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

        this.diagramEngine.getDiagramModel().addNode(this.initialNode)

        this.state = {
            height: "1px",
            width: "1px",
            selectedStr: "Nothing is selected!",
            isModalOpen: false,
            newOperation: null,
            newItemPosition: {x: 0, y: 0},
            generatedCode: "",
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
            case FlowType.ASSIGNMENT:
                if (data.variableName === "" || data.variableType === "" || data.value === "")
                    return

                node = new VariableNodeModel(new Variable(data.variableName, data.variableType as VariableType, data.value))
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = data.variableName + " = " + data.value

                // Add the new variable to the variable list
                this.state.variableList.push(new Variable(data.variableName, data.variableType as VariableType, data.value))

                break
            case FlowType.ARITHMETIC:
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
            case FlowType.WHILE:
                if (data.variableType === "" || data.first === "" || data.second === "" || data.operation === "")
                    return

                const condition = new Condition(data.variableType, JSON.parse(data.first), JSON.parse(data.second), data.operation)

                node = new WhileNodeModel()
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.conditionList.push(condition)
                node.info = condition.first.name + " " + condition.operation + " " + condition.second.name
                break
            case FlowType.INPUT:
                if (data.variableName === "" || data.variableType === "")
                    return

                node = new InputNodeModel(new Variable(data.variableName, data.variableType, null))
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = data.variableName

                // Add the new variable to the variable list
                this.state.variableList.push(new Variable(data.variableName, data.variableType as VariableType, null))
                break
            case FlowType.OUTPUT:
                if (data.variable === "")
                    return

                node = new OutputNodeModel(JSON.parse(data.variable))
                node.addOnLinkChangedListener(() => this.onLinkChanged())
                node.info = node.variable.name === undefined ? "" : node.variable.name
                break
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
        let currentFlow = this.initialNode.getNextFlow()
        // clear the code preview and return if the initial node link has deleted
        if (currentFlow == null) {
            const generator =
            this.setState({generatedCode: "[]"})
            return
        }

        const flowList = []
        let id = 0

        const list = []

        while (currentFlow != null) {
            if (currentFlow instanceof VariableNodeModel) {
                flowList.push(new FlowModel(
                    FlowType.ASSIGNMENT,
                    id++,
                    new AssignmentFlowContent(currentFlow.variable, id),
                    null,
                    null,
                    null,
                    null,
                    id
                ))
            } else if (currentFlow instanceof ArithmeticNodeModel) {
                flowList.push(new FlowModel(
                    FlowType.ASSIGNMENT,
                    id++,
                    null,
                    null,
                    null,
                    new ArithmeticFlowContent(
                        currentFlow.variable,
                        currentFlow.operation,
                        currentFlow.operator1,
                        currentFlow.operator2,
                        id
                    ),
                    null,
                    id
                ))
            } else if (currentFlow instanceof WhileNodeModel) {
                flowList.push(new FlowModel(
                    FlowType.ASSIGNMENT,
                    id++,
                    null,
                    null,
                    null,
                    null,
                    new WhileFlowContent(
                        currentFlow.conditionList,
                        -1, // TODO: Scope ID
                        id
                    ),
                    id
                ))
            } else if (currentFlow instanceof InputNodeModel) {
                flowList.push(new FlowModel(
                    FlowType.ASSIGNMENT,
                    id++,
                    null,
                    new InputFlowContent(currentFlow.variable, id),
                    null,
                    null,
                    null,
                    id
                ))
            } else if (currentFlow instanceof OutputNodeModel) {
                flowList.push(new FlowModel(
                    FlowType.ASSIGNMENT,
                    id++,
                    null,
                    null,
                    new OutputFlowContent(currentFlow.variable, id),
                    null,
                    null,
                    id
                ))
            }

            list.push({id: currentFlow.getID(), index: id - 1})
            currentFlow = currentFlow.getNextFlow()
        }

        console.log(JSON.stringify(flowList))

        const flowModelList = JSON.parse(JSON.stringify(flowList)) as FlowModel[]
        const lastItem = flowModelList[flowModelList.length - 1]
        if (lastItem.arithmeticFlowContent != null) {
            lastItem.arithmeticFlowContent.nextFlowId = -1
        } else if (lastItem.assignmentFlowContent != null) {
            lastItem.assignmentFlowContent.nextFlowId = -1
        } else if (lastItem.whileFlowContent != null) {
            lastItem.whileFlowContent.nextFlowId = -1
        } else if (lastItem.inputFlowContent != null) {
            lastItem.inputFlowContent.nextFlowId = -1
        } else if (lastItem.outputFlowContent != null) {
            lastItem.outputFlowContent.nextFlowId = -1
        }

        console.log(JSON.stringify(flowModelList))

        const generator = new CodeGenerator(JSON.stringify(flowModelList))
        this.setState({generatedCode: generator.generate()})
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
        if (event.entity instanceof VariableNodeModel) {
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
