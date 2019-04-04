import React, {Component} from "react"
import styles from "./Editor.module.css"
import * as _ from "lodash"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
import {DefaultNodeModel, DiagramEngine, DiagramModel, DiagramWidget} from "storm-react-diagrams"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {ProgrammingLanguage} from "../../models"
import {ProjectTreePanel} from "../../components/ProjectTreePanel/ProjectTreePanel"
import {CodeGenerator} from "../../generator/CodeGenerator";

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
    "    \"type\": \"input\",\n" +
    "    \"inputFlowContent\": {\n" +
    "      \"writeToVar\": \"first\",\n" +
    "      \"type\": \"Int\",\n" +
    "      \"nextFlowId\": 1\n" +
    "    },\n" +
    "    \"outputFlowContent\": null,\n" +
    "    \"arithmeticFlowContent\": null,\n" +
    "    \"forFlowContent\": null\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 1,\n" +
    "    \"type\": \"input\",\n" +
    "    \"inputFlowContent\": {\n" +
    "      \"writeToVar\": \"second\",\n" +
    "      \"type\": \"Int\",\n" +
    "      \"nextFlowId\": 2\n" +
    "    },\n" +
    "    \"outputFlowContent\": null,\n" +
    "    \"arithmeticFlowContent\": null,\n" +
    "    \"forFlowContent\": null\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 2,\n" +
    "    \"type\": \"arithmetic\",\n" +
    "    \"arithmeticFlowContent\": {\n" +
    "      \"writeToVar\": \"product\",\n" +
    "      \"operation\": \"Multiplication\",\n" +
    "      \"operator1Name\": \"first\",\n" +
    "      \"operator2Name\": \"second\",\n" +
    "      \"nextFlowId\": 3\n" +
    "    },\n" +
    "    \"outputFlowContent\": null,\n" +
    "    \"inputFlowContent\": null,\n" +
    "    \"forFlowContent\": null\n" +
    "  },\n" +
    "  {\n" +
    "    \"id\": 3,\n" +
    "    \"type\": \"output\",\n" +
    "    \"outputFlowContent\": {\n" +
    "      \"writeFromVar\": \"product\",\n" +
    "      \"type\": \"Int\",\n" +
    "      \"nextFlowId\": -1\n" +
    "    },\n" +
    "    \"inputFlowContent\": null,\n" +
    "    \"arithmeticFlowContent\": null,\n" +
    "    \"forFlowContent\": null\n" +
    "  }\n" +
    "]"

export interface IEditorProps {
}

export interface IEditorState {
    height: string | undefined,
    width: string | undefined,
    selectedStr: string
}

export default class Editor extends Component<IEditorProps, IEditorState> {
    private readonly activeModel: DiagramModel
    private readonly diagramEngine: DiagramEngine
    private readonly selected: string[] = []

    constructor(props: any) {
        super(props)

        this.diagramEngine = new DiagramEngine()
        this.diagramEngine.installDefaultFactories()

        this.activeModel = new DiagramModel()
        this.activeModel.setGridSize(10)
        this.diagramEngine.setDiagramModel(this.activeModel)

        _.forEach(this.activeModel.getNodes(), (item) => {
            item.addListener({
                selectionChanged: this.addItemListener.bind(this)
            })
        })

        this.state = {height: "1px", width: "1px", selectedStr: "Nothing is selected!"}

        const generator = new CodeGenerator(json)
        generator.generate()

    }

    onDrop(event: any): void {
        const data = JSON.parse(event.dataTransfer.getData("storm-diagram-node"))
        const nodesCount = _.keys(
            this.diagramEngine.getDiagramModel().getNodes()
        ).length

        let node = null
        if (data.type === "in") {
            node = new DefaultNodeModel("In Node " + (nodesCount + 1), "rgb(192, 255, 0)")
            const port = node.addInPort("In")
            port.setMaximumLinks(0)
        } else if (data.type === "in-out") {
            node = new DefaultNodeModel("In/Out Node " + (nodesCount + 1), "rgb(255, 192, 0)")
            node.addOutPort("Out").setMaximumLinks(0)
            node.addInPort("In").setMaximumLinks(0)
            node.addInPort("In").setMaximumLinks(0)
            node.addInPort("In").setMaximumLinks(0)
            node.updateDimensions({width: 1000, height: 1000})
        } else {
            node = new DefaultNodeModel("Out Node " + (nodesCount + 1), "rgb(0, 192, 255)")
            node.addOutPort("Out").setMaximumLinks(0)
        }
        const points = this.diagramEngine.getRelativeMousePoint(event)
        node.x = points.x
        node.y = points.y

        node.addListener({
            selectionChanged: this.addItemListener.bind(this)
        })

        this.diagramEngine.getDiagramModel().addNode(node)
        this.forceUpdate()
    }

    render() {
        return (
            <div className={styles.App}>
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
                                    <ShapeItem model={{type: "in"}} name="In"/>
                                    <ShapeItem model={{type: "out"}} name="Out"/>
                                    <ShapeItem model={{type: "in-out"}} name="InOut"/>
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
                                    style={{width: "100%", height: "100%", backgroundColor: "#1d1f21", color: "white"}}>
                                    {this.state.selectedStr}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter/>

                            <ReflexElement className="right-pane" minSize={100}>
                                <CodePreviewPanel code={exampleCode} language={ProgrammingLanguage.TYPESCRIPT}/>
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
