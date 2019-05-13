import React, {Component} from "react"
import Tree, {TreeNode} from "rc-tree"
import "rc-tree/assets/index.css"
import {FileModel} from "../../models/FileModel"
import {ProjectConsumer} from "../../stores/ProjectStore"
import {Icon, Menu, MenuItem} from "@material-ui/core"
import _ from "lodash"
import strings from "../../lang"

export interface ProjectTreePanelProps {
    onNewClass: (path: string) => void,
    onNewDataClass: (path: string) => void,
    onNewPackage: (path: string) => void,
    onNewFunctionality: (path: string) => void,
    onDoubleClickListener: (fileModel: FileModel & { path: string }) => void
}

export interface ProjectTreePanelState {
    itemPath: string,
    currentTarget: ((element: HTMLElement) => HTMLElement) | HTMLElement | undefined | null
}

export class ProjectTreePanel extends Component<ProjectTreePanelProps, ProjectTreePanelState> {
    nodeMap: { [key: string]: FileModel & { path: string } } = {}

    constructor(props: ProjectTreePanelProps) {
        super(props)
        this.state = {
            itemPath: "",
            currentTarget: null
        }
    }

    newClass = () => {
        this.props.onNewClass(this.state.itemPath)
        this.setState({currentTarget: null, itemPath: ""})
    }

    newDataClass = () => {
        this.props.onNewDataClass(this.state.itemPath)
        this.setState({currentTarget: null, itemPath: ""})
    }

    newFunction = () => {
        this.setState({currentTarget: null, itemPath: ""})
    }

    newPackage = () => {
        this.props.onNewPackage(this.state.itemPath)
        this.setState({currentTarget: null, itemPath: ""})
    }

    onDoubleClick = (fileModel: FileModel & { path: string }) => {
        this.props.onDoubleClickListener(fileModel)
    }

    renderTree = (fileModel: FileModel, parent?: string) => {
        this.nodeMap[fileModel.id] = _.merge(fileModel, {path: parent ? `${parent}/${fileModel.filename}` : fileModel.filename})

        if (fileModel.isDir) {
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
                            onClose={() => this.setState({currentTarget: null})}>
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
                                          itemPath: this.nodeMap[props.node.props.eventKey].path
                                      })
                              }}>
                            {this.renderTree(projectContext.project)}
                        </Tree>
                    </div>
                )}
            </ProjectConsumer>
        )
    }
}
