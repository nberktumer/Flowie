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
import {FlowModelGenerator} from "../../components/Flows"
import {BaseEvent, BaseModel} from "nberktumer-react-diagrams"
import {BaseFlowNode} from "../../components/CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BaseVariableFlowNode} from "../../components/Flows/Base/BaseVariableFlowNode"
import {EditorHeader} from "../../components/EditorHeader/EditorHeader"
import {FileUtils} from "../../utils"
import {MenuItem, TextField} from "@material-ui/core"
import {FlowProvider} from "../../stores/FlowStore"

export interface EditorProps {
}

export interface EditorState {
    isModalOpen: boolean,
    flowType: FlowType | null,
    flowPosition: { x: number, y: number },
    generatedCode: string,
    variableList: Variable[],
    selectedLanguage: ProgrammingLanguage
}

export default class Editor extends Component<EditorProps, EditorState> {
    readonly programmingLanguages = Object.keys(ProgrammingLanguage)
        .filter((k) => typeof ProgrammingLanguage[k as any] !== "number")
    canvasPanel = createRef<CanvasPanel>()
    codeGenerator = new CodeGenerator()

    constructor(props: any) {
        super(props)

        this.state = {
            isModalOpen: false,
            flowType: null,
            flowPosition: {x: 0, y: 0},
            generatedCode: this.codeGenerator.generate(ProgrammingLanguage.KOTLIN, []),
            variableList: [],
            selectedLanguage: ProgrammingLanguage.KOTLIN
        }
    }

    resetState = () => {
        this.setState({
            isModalOpen: false,
            flowType: null,
            flowPosition: {x: 0, y: 0},
            variableList: [],
            selectedLanguage: ProgrammingLanguage.KOTLIN
        })
    }

    onModalSaveClick(data: BasePropertiesState | null) {
        this.onModalClose()
        if (data && this.canvasPanel.current && this.state.flowType && !data.errorMessage && !data.errorField)
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
        console.log(flowModelList)
        this.setState({generatedCode: this.codeGenerator.generate(this.state.selectedLanguage, flowModelList)})
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

    // On item deleted
    onEntityRemoved(event: BaseEvent<BaseModel>) {

    }

    // On item selected
    onSelectionChanged(event: BaseEvent<BaseModel> & { isSelected: boolean }) {

    }

    onHeaderMenuClickListener = (item: string) => {
        switch (item) {
            case "new": {
                if (!this.canvasPanel.current)
                    return

                this.canvasPanel.current.newProject()
                this.resetState()
                this.onDiagramChanged()
                break
            }
            case "save": {
                if (!this.canvasPanel.current)
                    return

                const base64 = JSON.stringify(this.canvasPanel.current.saveProject())
                FileUtils.save("FlowieSave.flwie", base64)
                break
            }
            case "load": {
                FileUtils.load((data: string) => {
                    if (!this.canvasPanel.current)
                        return

                    this.canvasPanel.current.loadProject(data, (variableList: any) => {
                        this.resetState()
                        this.setState({variableList})
                        this.onDiagramChanged()
                    })
                }, (err: string) => {
                    console.error(err)
                })

                break
            }
            default:
                return
        }
    }

    render() {
        return (
            <FlowProvider value={{variableList: this.state.variableList}}>
                <div className={styles.App}>
                    <AddNodeDialog onSaveClick={this.onModalSaveClick.bind(this)}
                                   onDismissClick={this.onModalDismissClick.bind(this)}
                                   onClose={this.onModalClose.bind(this)}
                                   aria-labelledby="simple-dialog-title"
                                   open={this.state.isModalOpen}
                                   type={this.state.flowType}/>
                    <EditorHeader onClickListener={(item: string) => this.onHeaderMenuClickListener(item)}/>
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
                                             onItemAdded={this.onItemAdded.bind(this)}
                                             onDiagramChanged={this.onDiagramChanged.bind(this)}
                                             onDrop={this.onCanvasDrop.bind(this)}
                                             onSelectionChanged={this.onSelectionChanged.bind(this)}
                                             onEntityRemoved={this.onEntityRemoved.bind(this)}/>
                            </div>
                        </ReflexElement>

                        <ReflexSplitter/>

                        <ReflexElement minSize={250}>
                            <div style={{
                                display: "flex",
                                height: "100%",
                                width: "100%",
                                flexDirection: "column"
                            }}>
                                <TextField
                                    id="language-selector"
                                    select
                                    value={this.state.selectedLanguage}
                                    onChange={(event: any) => {
                                        this.setState({selectedLanguage: event.target.value}, () => {
                                            this.onDiagramChanged()
                                        })
                                    }}
                                    className={styles.languageSelector}
                                    margin="none">
                                    {this.programmingLanguages.map((key: any) => (
                                        <MenuItem key={key} value={key}>
                                            {ProgrammingLanguage[key]}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <div style={{
                                    display: "flex",
                                    flex: 1,
                                    height: "100%",
                                    width: "100%",
                                    flexDirection: "column"
                                }}>

                                    <CodePreviewPanel code={this.state.generatedCode}
                                                      language={this.state.selectedLanguage}/>
                                </div>
                            </div>
                        </ReflexElement>
                    </ReflexContainer>
                </div>
            </FlowProvider>
        )
    }
}
