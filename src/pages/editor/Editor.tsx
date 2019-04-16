import React, {Component, createRef} from "react"
import styles from "./Editor.module.css"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {FlowType, ProgrammingLanguage} from "../../models"
import {ProjectTreePanel} from "../../components/ProjectTreePanel/ProjectTreePanel"
import {AddNodeDialog} from "../../components/AddNodeDialog/AddNodeDialog"
import {BasePropertiesState} from "../../components/Flows/Base/BaseProperties"
import {CodeGenerator} from "../../generator/CodeGenerator"
import {Variable} from "../../models/Variable"
import CanvasPanel from "../../components/CanvasPanel/CanvasPanel"
import {FlowModelGenerator, FlowPropertiesFactory} from "../../components/Flows"
import {BaseEvent, BaseModel} from "nberktumer-react-diagrams"
import {BaseFlowNode} from "../../components/CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BaseVariableFlowNode} from "../../components/Flows/Base/BaseVariableFlowNode"

export interface EditorProps {
}

export interface EditorState {
    height: string | undefined,
    width: string | undefined,
    isModalOpen: boolean,
    flowType: FlowType | null,
    flowPosition: { x: number, y: number },
    generatedCode: string,
    variableList: Variable[],
    properties: JSX.Element,
    selectedItem: string
}

export default class Editor extends Component<EditorProps, EditorState> {
    canvasPanel = createRef<CanvasPanel>()

    constructor(props: any) {
        super(props)

        const generator = new CodeGenerator("[]")

        this.state = {
            height: "1px",
            width: "1px",
            isModalOpen: false,
            flowType: null,
            flowPosition: {x: 0, y: 0},
            generatedCode: generator.generate(),
            variableList: [],
            properties: <div/>,
            selectedItem: ""
        }
    }

    onModalSaveClick(data: BasePropertiesState | null) {
        this.onModalClose()
        if (data && this.canvasPanel.current && this.state.flowType)
            this.canvasPanel.current.addItem(this.state.flowType, data, this.state.flowPosition)
    }

    onModalDismissClick() {
        this.onModalClose()
    }

    onModalClose() {
        this.setState({
            isModalOpen: false,
            flowType: null,
            flowPosition: {x: 0, y: 0}
        })
    }

    onDiagramChanged() {
        if (!this.canvasPanel.current)
            return

        const flowModelList = FlowModelGenerator.generate(this.canvasPanel.current.initialNode)
        const generator = new CodeGenerator(JSON.stringify(flowModelList))
        this.setState({generatedCode: generator.generate()})
    }

    onCanvasDrop(type: FlowType, position: { x: number, y: number }) {
        this.setState({
            isModalOpen: true,
            flowType: type,
            flowPosition: position
        })
    }

    onItemAdded(flow: BaseFlowNode) {
        if (flow instanceof BaseVariableFlowNode) {
            this.state.variableList.push((flow as BaseVariableFlowNode).getVariable())
        }
    }

    onEntityRemoved(event: BaseEvent<BaseModel>) {
        if (event.entity instanceof BaseVariableFlowNode) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as BaseVariableFlowNode).getVariable().name
            })

            this.setState({variableList: newVariableList})
        }

        if (event.entity.getID() === this.state.selectedItem) {
            this.setState({properties: (<div/>), selectedItem: ""})
        }
    }

    onSelectionChanged(event: BaseEvent<BaseModel> & { isSelected: boolean }) {
        if (!this.canvasPanel.current || !(event.entity instanceof BaseFlowNode))
            return

        const selectedItems = this.canvasPanel.current.diagramEngine.diagramModel.getSelectedItems().filter((item) => {
            return item instanceof BaseFlowNode
        })

        if (selectedItems.length > 1) {
            this.setState({properties: (<div/>), selectedItem: ""})
        } else if (selectedItems.length === 1 && event.isSelected) {
            // Workaround for updating the properties panel
            this.setState({properties: <div/>}, () => {
                const properties = FlowPropertiesFactory.create((event.entity as BaseFlowNode).flowType, this.state.variableList, (data: BasePropertiesState) => {
                    (event.entity as BaseFlowNode).updateNode(data)
                    this.onDiagramChanged()
                }, event.entity as BaseFlowNode)

                this.setState({properties, selectedItem: event.entity.getID()})
            })
        } else {
            this.setState({properties: (<div/>), selectedItem: ""})
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
                               type={this.state.flowType}/>

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
                                    {Object.values(FlowType).filter((value) => value !== FlowType.INITIAL)
                                        .map((value) => (
                                            <ShapeItem key={value} model={{type: value}} name={value}/>
                                        ))}
                                </ShapePanel>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>

                    <ReflexSplitter/>

                    <ReflexElement className="middle-pane" flex={0.55} minSize={250}>
                        <div className={styles.paneContent}>
                            <CanvasPanel ref={this.canvasPanel}
                                         variableList={this.state.variableList}
                                         onItemAdded={this.onItemAdded.bind(this)}
                                         onDiagramChanged={this.onDiagramChanged.bind(this)}
                                         onDrop={this.onCanvasDrop.bind(this)}
                                         onSectionChanged={this.onSelectionChanged.bind(this)}
                                         onEntityRemoved={this.onEntityRemoved.bind(this)}/>
                        </div>
                    </ReflexElement>

                    <ReflexSplitter/>

                    <ReflexElement minSize={250}>
                        <ReflexContainer orientation="horizontal" style={{height: "100vh"}}>
                            <ReflexElement className="right-pane" flex={0.5} minSize={200}>
                                <div className={styles.propertiesPanel}>
                                    {this.state.properties}
                                </div>
                            </ReflexElement>

                            <ReflexSplitter/>

                            <ReflexElement className="right-pane" minSize={100}>
                                <CodePreviewPanel code={this.state.generatedCode}
                                                  language={ProgrammingLanguage.KOTLIN}/>
                            </ReflexElement>
                        </ReflexContainer>
                    </ReflexElement>
                </ReflexContainer>
            </div>
        )
    }
}
