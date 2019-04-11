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
import {FlowGenerator} from "../../components/Flows"
import {BaseEvent, BaseModel} from "nberktumer-react-diagrams"
import {BaseFlowModel} from "../../components/CanvasItems/Nodes/BaseFlow/BaseFlowModel"
import {InputFlowModel} from "../../components/Flows/Input/InputFlowModel"
import {AssignmentFlowModel} from "../../components/Flows/Assignment/AssignmentFlowModel"

export interface EditorProps {
}

export interface EditorState {
    height: string | undefined,
    width: string | undefined,
    isModalOpen: boolean,
    flowType: FlowType | null,
    flowPosition: { x: number, y: number },
    generatedCode: string,
    variableList: Variable[]
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
            variableList: []
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

        const flowModelList = FlowGenerator.generate(this.canvasPanel.current.initialNode)
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

    onItemAdded(flow: BaseFlowModel) {
        switch (flow.constructor) {
            case InputFlowModel:
                this.state.variableList.push((flow as InputFlowModel).variable)
                break
            case AssignmentFlowModel:
                this.state.variableList.push((flow as AssignmentFlowModel).variable)
                break
        }
    }

    onEntityRemoved(event: BaseEvent<BaseModel>) {
        if (event.entity instanceof AssignmentFlowModel || event.entity instanceof InputFlowModel) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as AssignmentFlowModel).variable.name
            })

            this.setState({variableList: newVariableList})
        }

        /*
                        const index = this.selected.indexOf((event.entity as DefaultNodeModel).name)
                        this.selected.splice(index, 1)

                        if (this.selected.length === 0) {
                            this.setState({selectedStr: "Nothing is selected!"})
                        } else {
                            this.setState({
                                selectedStr: this.selected.join(", ") +
                                    (this.selected.length === 1 ? " is " : " are ") + "selected."
                            })
                        }*/
    }

    onSelectionChanged(event: BaseEvent<BaseModel> & { isSelected: boolean }) {
        /*if (item.isSelected && this.selected.indexOf((item.entity as DefaultNodeModel).name) === -1) {
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
                }*/
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
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundColor: "#1d1f21",
                                        color: "white"
                                    }}>
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
