import React, {Component, createRef} from "react"
import styles from "./Home.module.css"
import {ReflexContainer, ReflexElement, ReflexSplitter} from "react-reflex"
import {ShapePanel} from "../../components/ShapePanel/ShapePanel"
import {ShapeItem} from "../../components/ShapePanel/ShapeItem"
import {CodePreviewPanel} from "../../components/CodePreviewPanel/CodePreviewPanel"
import {FlowType, ProgrammingLanguage, VariableType} from "../../models"
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
import {MenuItem, TextField} from "@material-ui/core"
import {FlowProvider} from "../../stores/FlowStore"
import {Project} from "../../generator/project/Project"
import {MainClazz} from "../../generator/project/MainClazz"
import {Clazz} from "../../generator/project/Clazz"
import {FileModel} from "../../models/FileModel"
import {Directory} from "../../generator/project/Directory"
import {ProjectProvider} from "../../stores/ProjectStore"
import {DirectoryItemType} from "../../generator/project/DirectoryItem"
import {Defaults} from "../../config"
import {DataClazz} from "../../generator/project/DataClazz"
import ClassModel from "../../models/ClassModel"
import {HOLDER} from "../../bigNoNoPackage/ReturnTypeHolder"

export interface EditorProps {
    project: { rootFileModel: FileModel, projectName: string, currentFile: FileModel }
}

export interface EditorState {
    dialogProps: { isOpen: boolean, flowType: FlowType | null, isCreateFile?: boolean, flowPosition?: { x: number, y: number }, filePath?: string },
    generatedCode: string,
    variableList: Variable[],
    classList: Clazz[],
    dataClassList: DataClazz[],
    classNameList: ClassModel[],
    packageNameList: string[],
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
            dialogProps: {isOpen: false, flowType: null},
            generatedCode: "",
            variableList: [],
            classList: [],
            dataClassList: [],
            classNameList: [],
            packageNameList: [],
            rootFileModel: props.project.rootFileModel,
            selectedLanguage: Defaults.PROGRAMMING_LANGUAGE
        }

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
            dialogProps: {isOpen: false, flowType: null},
            variableList: [],
            classList: [],
            dataClassList: [],
            classNameList: [],
            packageNameList: [],
            generatedCode: ""
        })
    }

    onModalSaveClick(data: BasePropertiesState | null) {
        this.onModalClose()
        if (data && this.canvasPanel.current && this.state.dialogProps.flowType && this.state.dialogProps.flowPosition && !data.errorMessage && !data.errorField)
            this.canvasPanel.current.addItem(this.state.dialogProps.flowType, data, this.state.dialogProps.flowPosition)
    }

    onModalDismissClick() {
        this.onModalClose()
    }

    onModalClose() {
        this.setState({
            dialogProps: {isOpen: false, flowType: null}
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
            this.generateDirectoryItems(item, this.project.rootDirectory, this.project.rootDirectory.name)
        })
    }

    onNewClass(fileModel: FileModel & { path: string }) {
        this.setState({
            dialogProps: {isOpen: true, isCreateFile: true, flowType: FlowType.CLASS, filePath: fileModel.path}
        })
    }

    onNewDataClass(fileModel: FileModel & { path: string }) {
        this.setState({
            dialogProps: {isOpen: true, isCreateFile: true, flowType: FlowType.DATA_CLASS, filePath: fileModel.path}
        })
    }

    onNewPackage(fileModel: FileModel & { path: string }) {
        this.setState({
            dialogProps: {isOpen: true, isCreateFile: true, flowType: FlowType.PACKAGE, filePath: fileModel.path}
        })
    }

    onNewFunctionality(fileModel: FileModel & { path: string }) {
        // this.setState({
        //     isModalOpen: true,
        //     isCreateFileDialog: true,
        //     newFileType: "functionality",
        //     newFilePath: path,
        //     newFileTitle: strings.newFunction
        // })
    }

    onNewFileSave(data: BasePropertiesState | null) {
        if (!data || !this.state.dialogProps.filePath)
            return

        const pathList = this.state.dialogProps.filePath.split("/")
        const newPath = `${this.state.dialogProps.filePath}/${data.name}`

        let currentDir = this.project.rootDirectory
        let lastFileModel: FileModel | undefined = this.state.rootFileModel
        pathList.forEach((path) => {
            if (lastFileModel) {
                const result = lastFileModel.children.find((val) => val.type === DirectoryItemType.DIRECTORY && val.filename === path)
                if (result) {
                    lastFileModel = result
                }
            }
            currentDir.items.forEach((dirItem) => {
                if (dirItem.type === DirectoryItemType.DIRECTORY && dirItem.name === path) {
                    currentDir = dirItem as Directory
                }
            })
        })

        if (lastFileModel) {
            switch (this.state.dialogProps.flowType) {
                case FlowType.PACKAGE: {
                    const directory = new Directory(data.name, [])
                    this.setState((prevState) => ({packageNameList: [...prevState.packageNameList, newPath]}))
                    currentDir.addDirectoryItem(directory)
                    lastFileModel.children.push(new FileModel(data.name, "", DirectoryItemType.DIRECTORY, []))
                    break
                }
                case FlowType.DATA_CLASS: {
                    const clazz = new DataClazz(data.name, data.fields.map((item: any) => new Variable(item.name, item.type, item.value)))
                    this.setState((prevState) => ({dataClassList: [...prevState.dataClassList, clazz]}))
                    this.setState((prevState) =>
                        ({classNameList: [...prevState.classNameList, new ClassModel(data.name, this.state.dialogProps.filePath!)]}))
                    currentDir.addDirectoryItem(clazz)
                    lastFileModel.children.push(new FileModel(data.name, "", DirectoryItemType.DATA_CLASS, []))
                    break
                }
                case FlowType.CLASS: {
                    const clazz = new Clazz(DirectoryItemType.CLASS, data.name, [])
                    this.setState((prevState) => ({classList: [...prevState.classList, clazz]}))
                    this.setState((prevState) => ({classNameList: [...prevState.classNameList, new ClassModel(data.name, this.state.dialogProps.filePath!)]}))
                    currentDir.addDirectoryItem(clazz)
                    lastFileModel.children.push(new FileModel(data.name, "", DirectoryItemType.CLASS, []))
                    break
                }
            }
        }

        this.onModalClose()
        this.forceUpdate()
    }

    onFileDoubleClick(fileModel: FileModel & { path: string }) {
        if (this.currentFileModel.id !== fileModel.id) {
            this.loadClass(fileModel)
        }
    }

    loadClass(fileModel: FileModel, saveCurrent: boolean = true) {
        if (fileModel.type !== DirectoryItemType.DIRECTORY && fileModel.type !== DirectoryItemType.DATA_CLASS && this.canvasPanel.current) {
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
        if (type === FlowType.RETURN && HOLDER.ReturnType === VariableType.NONE) {
            if (this.canvasPanel.current)
                this.canvasPanel.current.addItem(type, {}, position)
        } else {
            this.setState({
                dialogProps: {isOpen: true, flowType: type, flowPosition: position}
            })
        }
    }

    onItemAdded(flow: BaseFlowNode) {
        if (flow instanceof BaseVariableFlowNode) {
            this.setState((prevState) => ({variableList: [...prevState.variableList, (flow as BaseVariableFlowNode).getVariable()]}))
        }
    }

    // On item deleted
    onEntityRemoved(event: BaseEvent<BaseModel>) {
        if (event.entity instanceof BaseVariableFlowNode) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as BaseVariableFlowNode).getVariable().name
            })

            this.setState({variableList: newVariableList})
        }
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
            <FlowProvider value={{
                variableList: this.state.variableList,
                classList: this.state.classList,
                dataClassList: this.state.dataClassList,
                classNameList: this.state.classNameList,
                packageNameList: this.state.packageNameList
            }}>
                <ProjectProvider value={{project: this.state.rootFileModel}}>
                    <div className={styles.App}>
                        <AddNodeDialog
                            onSaveClick={this.state.dialogProps.isCreateFile ? this.onNewFileSave.bind(this) : this.onModalSaveClick.bind(this)}
                            onDismissClick={this.onModalDismissClick.bind(this)}
                            onClose={this.onModalClose.bind(this)}
                            aria-labelledby="simple-dialog-title"
                            open={this.state.dialogProps.isOpen}
                            file={this.state.dialogProps.isCreateFile}
                            type={this.state.dialogProps.flowType}/>
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

    private generateDirectoryItems(fileModel: FileModel, parent: Directory, path: string) {
        if (fileModel.type === DirectoryItemType.DIRECTORY) {
            const directory = new Directory(fileModel.filename, [])
            this.setState((prevState) => ({packageNameList: [...prevState.packageNameList, path]}))

            parent.addDirectoryItem(directory)
            fileModel.children.forEach((item) => {
                this.generateDirectoryItems(item, directory, `${path}/${item.filename}`)
            })
        } else {
            this.setState((prevState) => ({classNameList: [...prevState.classNameList, new ClassModel(fileModel.filename, path)]}))

            if (fileModel.type === DirectoryItemType.MAIN_CLASS) {
                if (this.currentFileModel.id === fileModel.id) {

                    const flowModelList = FlowModelGenerator.generate(this.canvasPanel.current ? this.canvasPanel.current.initialNode : null)

                    const clazz = new MainClazz(DirectoryItemType.MAIN_CLASS, fileModel.filename, flowModelList)
                    this.currentClass = clazz
                    parent.addDirectoryItem(clazz)
                } else {
                    parent.addDirectoryItem(new MainClazz(DirectoryItemType.MAIN_CLASS, fileModel.filename, []))
                }
            } else if (fileModel.type === DirectoryItemType.DATA_CLASS) {
                const clazz = new DataClazz(fileModel.filename, [])
                this.setState((prevState) => ({dataClassList: [...prevState.dataClassList, clazz]}))

                parent.addDirectoryItem(clazz)
            } else {
                if (this.currentFileModel.id === fileModel.id) {

                    const flowModelList = FlowModelGenerator.generate(this.canvasPanel.current ? this.canvasPanel.current.initialNode : null)

                    const clazz = new Clazz(DirectoryItemType.CLASS, fileModel.filename, flowModelList)
                    this.currentClass = clazz
                    this.setState((prevState) => ({classList: [...prevState.classList, clazz]}))

                    parent.addDirectoryItem(clazz)
                } else {
                    const clazz = new Clazz(DirectoryItemType.CLASS, fileModel.filename, [])
                    this.setState((prevState) => ({classList: [...prevState.classList, clazz]}))

                    parent.addDirectoryItem(clazz)
                }
            }
        }
    }
}
