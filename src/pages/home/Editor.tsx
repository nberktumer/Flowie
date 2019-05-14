import React, {Component, createRef} from "react"
import styles from "./Home.module.css"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {FlowType, ProgrammingLanguage} from "../../models"
import {ProjectTreePanel} from "../../components/ProjectTreePanel/ProjectTreePanel"
import {AddNodeDialog} from "../../components/AddNodeDialog/AddNodeDialog"
import {BasePropertiesState} from "../../components/Flows/Base/BaseProperties"
import {Variable} from "../../models/Variable"
import CanvasPanel from "../../components/CanvasPanel/CanvasPanel"
import {FlowModelGenerator} from "../../components/Flows"
import {BaseEvent, BaseModel} from "nberktumer-react-diagrams"
import {BaseFlowNode} from "../../components/CanvasItems/Nodes/BaseFlow/BaseFlowNode"
import {BaseVariableFlowNode} from "../../components/Flows/Base/BaseVariableFlowNode"
import {EditorHeader} from "../../components/EditorHeader/EditorHeader"
import {FileUtils} from "../../utils"
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    TextField
} from "@material-ui/core"
import {FlowProvider} from "../../stores/FlowStore"
import {Project} from "../../generator/project/Project"
import {MainClazz} from "../../generator/project/MainClazz"
import {Clazz} from "../../generator/project/Clazz"
import {FileModel} from "../../models/FileModel"
import {Directory} from "../../generator/project/Directory"
import {ProjectProvider} from "../../stores/ProjectStore"
import {DirectoryItemType} from "../../generator/project/DirectoryItem"
import strings from "../../lang"
import {Defaults} from "../../config"

export interface EditorProps {
    project: { rootFileModel: FileModel, projectName: string, currentFile: FileModel }
}

export interface EditorState {
    isModalOpen: boolean,
    isAddNewFileModalOpen: boolean,
    flowType: FlowType | null,
    flowPosition: { x: number, y: number },
    generatedCode: string,
    newFileName: string,
    newFileTitle: string,
    newFileType: string,
    newFilePath: string,
    variableList: Variable[],
    rootFileModel: FileModel,
    selectedLanguage: ProgrammingLanguage
}

export default class Editor extends Component<EditorProps, EditorState> {
    readonly programmingLanguages = Object.keys(ProgrammingLanguage)
        .filter((k) => typeof ProgrammingLanguage[k as any] !== "number")
    canvasPanel = createRef<CanvasPanel>()
    project: Project
    currentFileModel: FileModel
    currentClass: Clazz
    hasLoadedProject = false

    constructor(props: EditorProps) {
        super(props)

        this.project = new Project(props.project.projectName)
        this.currentClass = new MainClazz(DirectoryItemType.MAIN_CLASS, "", [])
        this.state = {
            isModalOpen: false,
            isAddNewFileModalOpen: false,
            flowType: null,
            flowPosition: {x: 0, y: 0},
            generatedCode: "",
            newFileName: "",
            newFileTitle: "",
            newFileType: "",
            newFilePath: "",
            variableList: [],
            rootFileModel: props.project.rootFileModel,
            selectedLanguage: ProgrammingLanguage.KOTLIN
        }

        console.log(props.project)
        this.currentFileModel = props.project.currentFile
    }

    componentDidMount(): void {
        this.forceUpdate()
    }

    componentDidUpdate(prevProps: Readonly<EditorProps>, prevState: Readonly<EditorState>, snapshot?: any): void {
        if (!this.hasLoadedProject) {
            this.loadClass(this.currentFileModel, false)
            this.hasLoadedProject = true
        }
    }

    resetState = () => {
        this.setState({
            isModalOpen: false,
            isAddNewFileModalOpen: false,
            flowType: null,
            flowPosition: {x: 0, y: 0},
            variableList: [],
            generatedCode: "",
            newFileName: "",
            newFileType: "",
            newFilePath: ""
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
        Project.setProgrammingLanguage(this.state.selectedLanguage)

        const flowModelList = FlowModelGenerator.generate(this.canvasPanel.current ? this.canvasPanel.current.initialNode : null)

        this.currentClass.reset(flowModelList)
        this.currentClass.generateCode()
        // this.project.generateClazzCodes() // TODO: use this for exporting the project
        this.setState({generatedCode: this.currentClass.getCode()})
    }

    updateDirectoryItems() {
        this.project.rootDirectory.items = []
        this.state.rootFileModel.children.forEach((item: FileModel) => {
            this.generateDirectoryItems(item, this.project.rootDirectory)
        })
    }

    onNewClass(path: string) {
        this.setState({
            isAddNewFileModalOpen: true,
            newFileType: "class",
            newFilePath: path,
            newFileTitle: strings.newClass
        })
    }

    onNewDataClass(path: string) {
        this.setState({
            isAddNewFileModalOpen: true,
            newFileType: "data_class",
            newFilePath: path,
            newFileTitle: strings.newDataClass
        })
    }

    onNewPackage(path: string) {
        this.setState({
            isAddNewFileModalOpen: true,
            newFileType: "package",
            newFilePath: path,
            newFileTitle: strings.newPackage
        })
    }

    onNewFunctionality(path: string) {
        this.setState({
            isAddNewFileModalOpen: true,
            newFileType: "functionality",
            newFilePath: path,
            newFileTitle: strings.newFunction
        })
    }

    onNewFileSave() {
        const pathList = this.state.newFilePath.split("/")

        let lastFileModel: FileModel | undefined = this.state.rootFileModel
        pathList.forEach((path) => {
            if (lastFileModel) {
                const result = lastFileModel.children.find((val) => val.isDir && val.filename === path)
                if (result) {
                    lastFileModel = result
                }
            }
        })

        if (lastFileModel) {
            switch (this.state.newFileType) {
                case "package":
                case "data_class":
                case "class": {
                    let currentDir = this.project.rootDirectory
                    pathList.forEach((path) => {
                        currentDir.items.forEach((dirItem) => {
                            if (dirItem.type === DirectoryItemType.DIRECTORY && dirItem.name === path) {
                                currentDir = dirItem as Directory
                            }
                        })
                    })
                    if (this.state.newFileType === "package") {
                        currentDir.addDirectoryItem(new Directory(this.state.newFileName, []))
                    } else {
                        currentDir.addDirectoryItem(new Clazz(DirectoryItemType.CLASS, this.state.newFileName, []))
                    }
                    lastFileModel.children.push(new FileModel(this.state.newFileName, "", this.state.newFileType === "package", false, []))
                    break
                }
            }
        }

        this.onAddNewFileDialogClose()
        this.forceUpdate()
    }

    onAddNewFileDialogClose() {
        this.setState({isAddNewFileModalOpen: false, newFileName: "", newFileTitle: "", newFileType: ""})
    }

    onFileDoubleClick(fileModel: FileModel & { path: string }) {
        if (this.currentFileModel.id !== fileModel.id) {
            this.loadClass(fileModel)
        }
    }

    loadClass(fileModel: FileModel, saveCurrent: boolean = true) {
        if (!fileModel.isDir && this.canvasPanel.current) {
            if (saveCurrent)
                this.currentFileModel.json = JSON.stringify(this.canvasPanel.current.saveProject())

            if (fileModel.json) {
                this.canvasPanel.current.loadProject(fileModel.json, (variableList: any) => {
                    this.currentFileModel = fileModel
                    this.resetState()
                    this.setState({variableList})
                    this.updateDirectoryItems()
                    this.onDiagramChanged()
                })
            } else {
                this.currentFileModel = fileModel
                this.canvasPanel.current.newProject()
                this.resetState()
                this.updateDirectoryItems()
                this.onDiagramChanged()
            }
        }
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

                this.currentFileModel.json = JSON.stringify(this.canvasPanel.current.saveProject())
                const saveContent = {
                    rootFileModel: this.state.rootFileModel,
                    projectName: this.project.projectName,
                    currentFile: this.currentFileModel
                }
                FileUtils.save(`${this.project.projectName}.${Defaults.SAVE_EXTENSION}`, JSON.stringify(saveContent))
                break
            }
            case "load": {
                FileUtils.load((data: string) => {
                    if (!this.canvasPanel.current)
                        return

                    try {
                        const loadedData = JSON.parse(data) as { rootFileModel: FileModel, projectName: string, currentFile: FileModel }

                        this.project = new Project(loadedData.projectName)
                        this.setState({rootFileModel: loadedData.rootFileModel})
                        this.loadClass(loadedData.currentFile)
                    } catch (e) {
                        console.error(e)
                    }
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
                <ProjectProvider value={{project: this.state.rootFileModel}}>
                    <div className={styles.App}>
                        <Dialog
                            open={this.state.isAddNewFileModalOpen}
                            onClose={() => this.onAddNewFileDialogClose()}
                            aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">{this.state.newFileTitle}</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a auctor dui. Nunc at
                                    pellentesque purus. Aliquam leo massa, pellentesque.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="fileName"
                                    onChange={(e) => this.setState({newFileName: e.target.value})}
                                    label={strings.projectName}
                                    fullWidth
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => this.onAddNewFileDialogClose()} color="primary">
                                    {strings.cancel}
                                </Button>
                                <Button onClick={() => this.onNewFileSave()} color="primary">
                                    {strings.create}
                                </Button>
                            </DialogActions>
                        </Dialog>
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
                                            <ProjectTreePanel
                                                onDoubleClickListener={(fileModel) => this.onFileDoubleClick(fileModel)}
                                                onNewClass={(path) => this.onNewClass(path)}
                                                onNewDataClass={(path) => this.onNewDataClass(path)}
                                                onNewFunctionality={(path) => this.onNewFunctionality(path)}
                                                onNewPackage={(path) => this.onNewPackage(path)}/>
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
                </ProjectProvider>
            </FlowProvider>
        )
    }

    private generateDirectoryItems(fileModel: FileModel, parent: Directory) {
        if (fileModel.isDir) {
            const directory = new Directory(fileModel.filename, [])
            parent.addDirectoryItem(directory)
            fileModel.children.forEach((item) => {
                this.generateDirectoryItems(item, directory)
            })
        } else {
            if (fileModel.isMainClass) {
                if (this.currentFileModel.id === fileModel.id) {
                    const flowModelList = FlowModelGenerator.generate(this.canvasPanel.current ? this.canvasPanel.current.initialNode : null)
                    console.log(flowModelList)

                    const clazz = new MainClazz(DirectoryItemType.MAIN_CLASS, fileModel.filename, flowModelList)

                    this.currentClass = clazz
                    parent.addDirectoryItem(clazz)
                } else {
                    parent.addDirectoryItem(new MainClazz(DirectoryItemType.MAIN_CLASS, fileModel.filename, []))
                }
            } else {
                if (this.currentFileModel.id === fileModel.id) {
                    const flowModelList = FlowModelGenerator.generate(this.canvasPanel.current ? this.canvasPanel.current.initialNode : null)
                    console.log(flowModelList)

                    const clazz = new Clazz(DirectoryItemType.CLASS, fileModel.filename, flowModelList)

                    this.currentClass = clazz
                    parent.addDirectoryItem(clazz)
                } else {
                    parent.addDirectoryItem(new Clazz(DirectoryItemType.CLASS, fileModel.filename, []))
                }
            }
        }
    }
}
