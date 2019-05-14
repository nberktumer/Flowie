import React, {Component} from "react"
import Tree, {TreeNode} from "rc-tree"
import "rc-tree/assets/index.css"
import {FileModel} from "../../models/FileModel"
import {ProjectConsumer} from "../../stores/ProjectStore"
import {Icon, Menu, MenuItem} from "@material-ui/core"
import _ from "lodash"
import strings from "../../lang"
import {DirectoryItemType} from "../../generator/project/DirectoryItem"

export interface ProjectTreePanelProps {
    onNewClass: (fileModel: FileModel & { path: string }) => void,
    onNewDataClass: (fileModel: FileModel & { path: string }) => void,
    onNewPackage: (fileModel: FileModel & { path: string }) => void,
    onNewFunctionality: (fileModel: FileModel & { path: string }) => void,
    onDoubleClickListener: (fileModel: FileModel & { path: string }) => void
}

export interface ProjectTreePanelState {
    item: FileModel & { path: string } | null,
    currentTarget: ((element: HTMLElement) => HTMLElement) | HTMLElement | undefined | null
}

export class ProjectTreePanel extends Component<ProjectTreePanelProps, ProjectTreePanelState> {
    nodeMap: { [key: string]: FileModel & { path: string } } = {}

    constructor(props: ProjectTreePanelProps) {
        super(props)
        this.state = {
            item: null,
            currentTarget: null
        }
    }

    newClass = () => {
        if (!this.state.item)
            return
        this.props.onNewClass(this.state.item)
        this.onClose()
    }

    newDataClass = () => {
        if (!this.state.item)
            return
        this.props.onNewDataClass(this.state.item)
        this.onClose()
    }

    newFunction = () => {
        if (!this.state.item)
            return
        this.onClose()
    }

    newPackage = () => {
        if (!this.state.item)
            return
        this.props.onNewPackage(this.state.item)
        this.onClose()
    }

    onDoubleClick = (fileModel: FileModel & { path: string }) => {
        this.props.onDoubleClickListener(fileModel)
    }

    renderTree = (fileModel: FileModel, parent?: string) => {
        this.nodeMap[fileModel.id] = _.merge(fileModel, {path: parent ? `${parent}/${fileModel.filename}` : fileModel.filename})

        if (fileModel.type === DirectoryItemType.DIRECTORY) {
            return (
                <TreeNode icon={<Icon style={{fontSize: 16}}>folder</Icon>}
                          title={fileModel.filename}
                          key={fileModel.id} isLeaf={false}>
                    {fileModel.children.map((value) => this.renderTree(value, this.nodeMap[fileModel.id].path))}
                </TreeNode>
            )
        } else {
            return <TreeNode icon={<Icon style={{fontSize: 16}}>insert_drive_file</Icon>}
                             title={fileModel.filename}
                             key={fileModel.id} isLeaf={true}/>
        }
    }

    render() {
        return (
            <ProjectConsumer>
                {(projectContext) => (
                    <div style={{color: "white"}}>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.currentTarget}
                            open={Boolean(this.state.currentTarget)}
                            onClose={() => this.onClose()}>
                            <MenuItem onClick={() => this.newPackage()}>{strings.newPackage}</MenuItem>
                            {/* TODO: Change this to "new class" later */}
                            <MenuItem onClick={() => this.newClass()}>{strings.newFunction}</MenuItem>
                            <MenuItem onClick={() => this.newDataClass()}>{strings.newDataClass}</MenuItem>
                            {/*<MenuItem onClick={() => this.newFunction()}>{strings.newFunction}</MenuItem>*/}
                        </Menu>
                        <Tree defaultExpandAll
                              selectable={false}
                              onMouseEnter={(e) => {
                                  if (e.event.target)
                                      e.event.target.addEventListener("dblclick", () => this.onDoubleClick(this.nodeMap[e.node.props.eventKey]))
                              }}
                              onMouseLeave={(e) => {
                                  if (e.event.target)
                                      e.event.target.removeEventListener("dblclick", () => this.onDoubleClick(this.nodeMap[e.node.props.eventKey]))
                              }}
                              onRightClick={(props) => {
                                  if (!props.node.props.isLeaf)
                                      this.setState({
                                          currentTarget: props.event.currentTarget as HTMLElement,
                                          item: this.nodeMap[props.node.props.eventKey]
                                      })
                              }}>
                            {this.renderTree(projectContext.project)}
                        </Tree>
                    </div>
                )}
            </ProjectConsumer>
        )
    }

    private onClose = () => {
        this.setState({currentTarget: null, item: null})
    }
}
