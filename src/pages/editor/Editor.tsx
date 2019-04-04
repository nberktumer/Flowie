import React, {Component} from "react"
import styles from "./Editor.module.css"
import * as _ from "lodash"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
import {DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "storm-react-diagrams"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {Operations, ProgrammingLanguage, VariableType} from "../../models"
import {ProjectTreePanel} from "../../components/ProjectTreePanel/ProjectTreePanel"
import {TriangleNodeFactory} from "../../components/CanvasItems/Nodes/BaseNodes/TriangleNode/TriangleNodeFactory"
import {PortFactory} from "../../components/CanvasItems/Ports/PortFactory"
import {RectangleNodeFactory} from "../../components/CanvasItems/Nodes/BaseNodes/RectangleNode/RectangleNodeFactory"
import {RectangleNodeWithInfoFactory} from "../../components/CanvasItems/Nodes/BaseNodes/RectangleNode/RectangleNodeWithInfo/RectangleNodeWithInfoFactory"
import {VariableNodeModel} from "../../components/CanvasItems/Nodes/VariableNode/VariableNodeModel"
import {AddNodeDialog} from "../../components/AddNodeDialog/AddNodeDialog"
import {BaseDialogBodyState} from "../../components/AddNodeDialog/DialogBody/BaseDialogBody"
import {CodeGenerator} from "../../generator/CodeGenerator"
import {DefaultPortModel, DefaultPortType} from "../../components/CanvasItems/Ports/DefaultPort"
import {string} from "prop-types";

const exampleCode = `class Editor extends Component {
    private readonly activeModel: SRD.DiagramModel
    private readonly diagramEngine: SRD.DiagramEngine

    constructor(props: any) {
        super(props)

        this.diagramEngine = new SRD.DiagramEngine()
        this.diagramEngine.installDefaultFactories()

        this.activeModel = new SRD.DiagramModel()
        this.diagramEngine.setDiagramModel(this.activeModel)

        this.newModel()

        this.state = {height: "1px", width: "1px"}
    }
}`

const json = "[\n" +
    "  {\n" +
    "    \"id\": 0,\n" +
    "    \"type\": \"assignment\",\n" +
    "    \"assignmentFlowContent\": {\n" +
    "      \"variable\": {\n" +
    "        \"name\": \"total\",\n" +
    "        \"value\": \"1\",\n" +
    "        \"type\": \"Int\"\n" +
    "      },\n" +
    "      \"nextFlowId\": 1\n" +
    "    }\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 1,\n" +
    "    \"type\": \"input\",\n" +
    "    \"inputFlowContent\": {\n" +
    "      \"variable\": {\n" +
    "        \"name\": \"n\",\n" +
    "        \"type\": \"Int\"\n" +
    "      },\n" +
    "      \"nextFlowId\": 2\n" +
    "    }\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 2,\n" +
    "    \"type\": \"while\",\n" +
    "    \"whileFlowContent\": {\n" +
    "      \"conditions\": [\n" +
    "        {\n" +
    "          \"variableType\": \"Int\",\n" +
    "          \"first\": {\n" +
    "            \"name\": \"n\"\n" +
    "          },\n" +
    "          \"second\": {\n" +
    "            \"name\": 1\n" +
    "          },\n" +
    "          \"operation\": \"NotEquals\"\n" +
    "        }\n" +
    "      ],\n" +
    "      \"scopeId\": 3,\n" +
    "      \"nextFlowId\": 5\n" +
    "    }\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 3,\n" +
    "    \"type\": \"arithmetic\",\n" +
    "    \"arithmeticFlowContent\": {\n" +
    "      \"variable\": {\n" +
    "        \"name\": \"total\"\n" +
    "      },\n" +
    "      \"operation\": \"Multiplication\",\n" +
    "      \"operator1\": {\n" +
    "        \"type\": \"Variable\",\n" +
    "        \"variableName\": \"n\"\n" +
    "      },\n" +
    "      \"operator2\": {\n" +
    "        \"type\": \"Variable\",\n" +
    "        \"variableName\": \"total\"\n" +
    "      },\n" +
    "      \"nextFlowId\": 4\n" +
    "    }\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 4,\n" +
    "    \"type\": \"arithmetic\",\n" +
    "    \"arithmeticFlowContent\": {\n" +
    "      \"variable\": {\n" +
    "        \"name\": \"n\"\n" +
    "      },\n" +
    "      \"operation\": \"Subtraction\",\n" +
    "      \"operator1\": {\n" +
    "        \"type\": \"Variable\",\n" +
    "        \"variableName\": \"n\"\n" +
    "      },\n" +
    "      \"operator2\": {\n" +
    "        \"type\": \"Constant\",\n" +
    "        \"constantValue\": 1\n" +
    "      },\n" +
    "      \"nextFlowId\": 2\n" +
    "    }\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 5,\n" +
    "    \"type\": \"output\",\n" +
    "    \"outputFlowContent\": {\n" +
    "      \"variable\": {\n" +
    "        \"name\": \"total\",\n" +
    "        \"type\": \"Int\"\n" +
    "      },\n" +
    "      \"nextFlowId\": -1\n" +
    "    }\n" +
    "  }\n" +
    "]"

export interface IEditorProps {
}

export interface IEditorState {
    height: string | undefined,
    width: string | undefined,
    selectedStr: string,
    isModalOpen: boolean,
    newOperation: Operations | null,
    newItemPosition: { x: number, y: number },
    generatedCode: string
}

export default class Editor extends Component<IEditorProps, IEditorState> {
    private readonly activeModel: DiagramModel
    private readonly diagramEngine: DiagramEngine
    private readonly selected: string[] = []

    constructor(props: any) {
        super(props)

        this.diagramEngine = new DiagramEngine()
        this.diagramEngine.installDefaultFactories()

        this.diagramEngine.registerNodeFactory(new TriangleNodeFactory())
        this.diagramEngine.registerNodeFactory(new RectangleNodeFactory())
        this.diagramEngine.registerNodeFactory(new RectangleNodeWithInfoFactory())
        this.diagramEngine.registerPortFactory(new PortFactory("single", () => new DefaultPortModel(DefaultPortType.IN, "unknown")))

        this.activeModel = new DiagramModel()
        this.diagramEngine.setDiagramModel(this.activeModel)

        _.forEach(this.activeModel.getNodes(), (item) => {
            item.addListener({
                selectionChanged: this.addItemListener.bind(this)
            })
        })

        const generator = new CodeGenerator(json)

        this.state = {
            height: "1px",
            width: "1px",
            selectedStr: "Nothing is selected!",
            isModalOpen: false,
            newOperation: null,
            newItemPosition: {x: 0, y: 0},
            generatedCode: generator.generate()
        }

    }

    onDrop(event: any): void {
        const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"))

        if (!Object.values(Operations).includes(data.type))
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
            case Operations.VARIABLE:
                if (data.variableName === "" || data.value === "")
                    return

                node = new VariableNodeModel(data.variableType as VariableType)
                node.info = data.variableName + " = " + data.value
                break
            case Operations.IF:
                break
            case Operations.FOR:
                break
            case Operations.SWITCH:
                break
            case Operations.WHILE:
                break
            default:
                return
        }

        if (node == null)
            return

        node.x = this.state.newItemPosition.x
        node.y = this.state.newItemPosition.y

        node.addListener({
            selectionChanged: this.addItemListener.bind(this)
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

    render() {
        return (
            <div className={styles.App}>
                <AddNodeDialog onSaveClick={this.onModalSaveClick.bind(this)}
                               onDismissClick={this.onModalDismissClick.bind(this)}
                               onClose={this.onModalClose.bind(this)}
                               aria-labelledby="simple-dialog-title"
                               open={this.state.isModalOpen}
                               type={Operations.VARIABLE}/>

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
                                    <ShapeItem model={{type: Operations.WHILE.toString()}}
                                               name={Operations.WHILE.toString()}/>
                                    <ShapeItem model={{type: Operations.FOR.toString()}}
                                               name={Operations.FOR.toString()}/>
                                    <ShapeItem model={{type: Operations.SWITCH.toString()}}
                                               name={Operations.SWITCH.toString()}/>
                                    <ShapeItem model={{type: Operations.IF.toString()}}
                                               name={Operations.IF.toString()}/>
                                    <ShapeItem model={{type: Operations.VARIABLE.toString()}}
                                               name={Operations.VARIABLE.toString()}/>
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
                                <CodePreviewPanel code={this.state.generatedCode} language={ProgrammingLanguage.TYPESCRIPT}/>
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
}
