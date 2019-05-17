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
import {FileUtils, FlowCategory} from "../../utils"
import {MenuItem, Tab, Tabs, TextField} from "@material-ui/core"
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
import {DataClassFlowNode} from "../../components/Flows/DataClass/DataClassFlowNode"
import {FlowStateProvider} from "../../stores/FlowStateStore"
import {InitialFlowNode} from "../../components/Flows/Initial/InitialFlowNode"
import {ClassFlowNode} from "../../components/Flows/Class/ClassFlowNode"
import ClazzModel from "../../models/ClazzModel"
import {ArithmeticFlowNode} from "../../components/Flows/Arithmetic/ArithmeticFlowNode"
import {CurrentTimeFlowNode} from "../../components/Flows/CurrentTime/CurrentTimeFlowNode"
import {ListGetFlowNode} from "../../components/Flows/List/ListGet/ListGetFlowNode"
import {ListSizeFlowNode} from "../../components/Flows/List/ListSize/ListSizeFlowNode"

export interface EditorProps {
    project: { rootFileModel: FileModel, projectName: string, currentFile: FileModel, bigBigNoPackage: { ReturnType: VariableType, classList: ClazzModel[], currentClass: Clazz } }
}

export interface EditorState {
    dialogProps: { isOpen: boolean, flowType: FlowType | null, isCreateFile?: boolean, flowPosition?: { x: number, y: number }, filePath?: string },
    generatedCode: string,
    variableList: Variable[],
    argList: Variable[],
    classList: ClazzModel[],
    dataClassList: DataClazz[],
    classNameList: ClassModel[],
    packageNameList: string[],
    rootFileModel: FileModel,
    selectedLanguage: ProgrammingLanguage,
    selectedTab: any
}

export default class Editor extends Component<EditorProps, EditorState> {
    readonly programmingLanguages = Object.keys(ProgrammingLanguage)
        .filter((k) => typeof ProgrammingLanguage[k as any] !== "number")
    canvasPanel = createRef<CanvasPanel>()
    project: Project
    currentFileModel: FileModel
    currentClass: Clazz
    currentClassData: ClazzModel
    hasLoadedProject = false

    constructor(props: EditorProps) {
        super(props)

        this.project = new Project(props.project.projectName)
        Object.assign(HOLDER, props.project.bigBigNoPackage)
        this.currentClass = new MainClazz(DirectoryItemType.MAIN_CLASS, "", [])
        this.currentClassData = new ClazzModel("", [], VariableType.NONE, VariableType.NONE)
        this.state = {
            dialogProps: {isOpen: false, flowType: null},
            generatedCode: "",
            variableList: [],
            argList: [],
            classList: [],
            dataClassList: [],
            classNameList: [],
            packageNameList: [],
            rootFileModel: props.project.rootFileModel,
            selectedLanguage: Defaults.PROGRAMMING_LANGUAGE,
            selectedTab: 0
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
            argList: [],
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
        console.log(flowModelList)

        const returnType = this.currentClassData.returnType
        const returnListType = this.currentClassData.returnListType
        this.currentClass.reset(
            this.currentClassData.argList,
            returnType === VariableType.LIST ? returnListType : returnType,
            returnType === VariableType.LIST,
            flowModelList)
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
                    const clazz = new Clazz([], VariableType.NONE, false, DirectoryItemType.CLASS, data.name, [])
                    const clazzModel = new ClazzModel(data.name, this.canvasPanel.current!.initialNode.argList, this.canvasPanel.current!.initialNode.returnType, this.canvasPanel.current!.initialNode.returnListType)
                    this.setState((prevState) => ({classList: [...prevState.classList, clazzModel]}))
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
                    this.setState({variableList}, () => {
                        this.updateDirectoryItems()
                        this.onDiagramChanged()
                    })
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
        } else if (flow instanceof DataClassFlowNode) {
            this.setState((prevState) => ({variableList: [...prevState.variableList, new Variable((flow as DataClassFlowNode).variableName, VariableType.NONE, null)]}))
        } else if (flow instanceof ClassFlowNode && flow.variable) {
            this.setState((prevState) => ({variableList: [...prevState.variableList, flow.variable]}))
        } else if ((flow instanceof ArithmeticFlowNode && flow.isNewVariable) || (flow instanceof CurrentTimeFlowNode && flow.isNewVariable)) {
            this.setState((prevState) => ({variableList: [...prevState.variableList, flow.getVariable()]}))
        } else if ((flow instanceof ListGetFlowNode && flow.isNewVariable) || (flow instanceof ListSizeFlowNode && flow.isNewVariable)) {
            this.setState((prevState) => ({variableList: [...prevState.variableList, flow.variable]}))
        }
    }

    // On item deleted
    onEntityRemoved(event: BaseEvent<BaseModel>) {
        if (event.entity instanceof BaseVariableFlowNode) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as BaseVariableFlowNode).getVariable().name
            })

            this.setState({variableList: newVariableList})
        } else if (event.entity instanceof ClassFlowNode) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as ClassFlowNode).variable.name
            })

            this.setState({variableList: newVariableList})
        } else if (event.entity instanceof DataClassFlowNode) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as DataClassFlowNode).variableName
            })

            this.setState({variableList: newVariableList})
        } else if (event.entity instanceof ArithmeticFlowNode && event.entity.isNewVariable) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as ArithmeticFlowNode).getVariable().name
            })

            this.setState({variableList: newVariableList})
        } else if (event.entity instanceof CurrentTimeFlowNode && event.entity.isNewVariable) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as CurrentTimeFlowNode).getVariable().name
            })

            this.setState({variableList: newVariableList})
        } else if (event.entity instanceof ListGetFlowNode && event.entity.isNewVariable) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as ListGetFlowNode).variable.name
            })

            this.setState({variableList: newVariableList})
        } else if (event.entity instanceof ListSizeFlowNode && event.entity.isNewVariable) {
            const newVariableList = this.state.variableList.filter((value) => {
                return value.name !== (event.entity as ListSizeFlowNode).variable.name
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
                    currentFile: this.currentFileModel,
                    bigBigNoPackage: HOLDER
                }

                console.log(saveContent)
                console.log(JSON.stringify(saveContent))
                FileUtils.save(`${this.project.projectName}.${Defaults.SAVE_EXTENSION}`, JSON.stringify(saveContent))
                break
            }
            case "load": {
                FileUtils.load((data: string) => {
                    if (!this.canvasPanel.current)
                        return

                    try {
                        const loadedData = JSON.parse(data) as { rootFileModel: FileModel, projectName: string, currentFile: FileModel, bigBigNoPackage: { ReturnType: VariableType, classList: ClazzModel[] } }
                        Object.assign(HOLDER.classList, loadedData.bigBigNoPackage.classList)
                        HOLDER.ReturnType = loadedData.bigBigNoPackage.ReturnType
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
            // case "export": {
            //     this.project.generateClazzCodes()
            //     break
            // }
            default:
                return
        }
    }

    render() {
        return (
            <FlowStateProvider value={{
                flowChangedListener: (node: BaseFlowNode) => {
                    if (node.flowType === FlowType.INITIAL) {
                        const initialNode = node as InitialFlowNode
                        if (this.canvasPanel.current) {
                            initialNode.id = this.canvasPanel.current.initialNode.getID()
                            initialNode.x = this.canvasPanel.current.initialNode.x
                            initialNode.y = this.canvasPanel.current.initialNode.y
                            Object.assign(this.canvasPanel.current.activeModel.getNode(initialNode.getID()), initialNode)
                            this.canvasPanel.current.initialNode = initialNode
                            this.currentClassData.argList = initialNode.argList
                            this.currentClassData.returnType = initialNode.returnType
                            this.currentClassData.returnListType = initialNode.returnListType
                            const currentClassData = this.state.classList.map((item, index) => {
                                if (item.name === this.currentClassData.name) {
                                    return this.currentClassData
                                } else {
                                    return item
                                }
                            })
                            Object.assign(HOLDER.classList, currentClassData)
                            this.setState({
                                classList: currentClassData,
                                argList: this.canvasPanel.current.initialNode.argList
                            })
                        }
                    }
                    this.onDiagramChanged()
                }
            }}>
                <FlowProvider value={{
                    variableList: this.state.variableList,
                    argList: this.state.argList,
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
                                <ReflexElement minSize={250} flex={0.15}>
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
                                            <div className={styles.flowContainer}>
                                                <Tabs
                                                    value={this.state.selectedTab}
                                                    onChange={(e, v) => this.setState({selectedTab: v})}
                                                    style={{
                                                        backgroundColor: "#1d1f21",
                                                        color: "white",
                                                        marginBottom: 16

                                                    }}
                                                    variant="scrollable"
                                                    indicatorColor="#fff"
                                                    scrollButtons="auto">
                                                    {FlowCategory.map((category, index) => (
                                                        <Tab key={index} value={index} label={category.name}/>
                                                    ))}
                                                </Tabs>
                                                <ShapePanel>
                                                    {FlowCategory[this.state.selectedTab].flows.map((flow, index) => (
                                                        <ShapeItem key={index} model={{type: flow}} name={flow}/>
                                                    ))}
                                                </ShapePanel>
                                            </div>
                                        </ReflexElement>
                                    </ReflexContainer>
                                </ReflexElement>

                                <ReflexSplitter/>

                                <ReflexElement className="middle-pane" flex={0.6} minSize={250}>
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

                                <ReflexElement minSize={250} flex={0.25}>
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
            </FlowStateProvider>
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
                    HOLDER.currentClass = clazz
                    this.currentClassData = new ClazzModel(fileModel.filename, this.canvasPanel.current!.initialNode.argList, this.canvasPanel.current!.initialNode.returnType, this.canvasPanel.current!.initialNode.returnListType)
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
                    const returnType = this.canvasPanel.current!.initialNode.returnType
                    const returnListType = this.canvasPanel.current!.initialNode.returnListType

                    const clazz = new Clazz(
                        this.canvasPanel.current!.initialNode.argList,
                        returnType === VariableType.LIST ? returnListType : returnType,
                        returnType === VariableType.LIST,
                        DirectoryItemType.CLASS,
                        fileModel.filename,
                        flowModelList
                    )
                    const clazzModel = new ClazzModel(fileModel.filename, this.canvasPanel.current!.initialNode.argList, this.canvasPanel.current!.initialNode.returnType, this.canvasPanel.current!.initialNode.returnListType)
                    this.currentClass = clazz
                    HOLDER.currentClass = clazz
                    this.currentClassData = clazzModel
                    this.setState((prevState) => ({
                        classList: [...prevState.classList, clazzModel],
                        argList: this.canvasPanel.current!.initialNode.argList
                    }))

                    parent.addDirectoryItem(clazz)
                } else {
                    const returnType = this.canvasPanel.current!.initialNode.returnType
                    const returnListType = this.canvasPanel.current!.initialNode.returnListType

                    const clazz = new Clazz(
                        this.canvasPanel.current!.initialNode.argList,
                        returnType === VariableType.LIST ? returnListType : returnType,
                        returnType === VariableType.LIST,
                        DirectoryItemType.CLASS,
                        fileModel.filename,
                        []
                    )
                    const clazzModel = new ClazzModel(fileModel.filename, this.canvasPanel.current!.initialNode.argList, this.canvasPanel.current!.initialNode.returnType, this.canvasPanel.current!.initialNode.returnListType)
                    this.setState((prevState) => ({classList: [...prevState.classList, clazzModel]}))

                    parent.addDirectoryItem(clazz)
                }
            }
        }
    }
}
