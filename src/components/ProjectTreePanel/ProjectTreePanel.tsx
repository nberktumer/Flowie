import React, {Component} from "react"
import Tree, {TreeNode} from "rc-tree"
import "rc-tree/assets/index.css"
import {FileModel} from "../../models/FileModel"
import {ProjectConsumer} from "../../stores/ProjectStore"
import {Menu, MenuItem} from "@material-ui/core"

export interface ProjectTreePanelProps {
    onNewClass: (path: string) => void,
    onNewPackage: (path: string) => void,
    onNewFunctionality: (path: string) => void
}

export interface ProjectTreePanelState {
    isContextMenuVisible: boolean,
    itemPath: string
}

export class ProjectTreePanel extends Component<ProjectTreePanelProps, ProjectTreePanelState> {
    nodeMap: { [key: string]: string } = {}

    constructor(props: ProjectTreePanelProps) {
        super(props)
        this.state = {
            isContextMenuVisible: false,
            itemPath: ""
        }
    }

    newClass = () => {
        this.props.onNewClass(this.state.itemPath)
        this.setState({isContextMenuVisible: false, itemPath: ""})
    }

    newPackage = () => {
        this.props.onNewPackage(this.state.itemPath)
        this.setState({isContextMenuVisible: false, itemPath: ""})
    }

    renderTree = (fileModel: FileModel, parent?: string) => {
        this.nodeMap[fileModel.id] = parent ? `${parent}/${fileModel.filename}` : fileModel.filename

        if (fileModel.isDir) {
            return (
                <TreeNode title={fileModel.filename} key={fileModel.id} isLeaf={false}>
                    {fileModel.children.map((value) => this.renderTree(value, parent ? `${parent}/${fileModel.filename}` : fileModel.filename))}
                </TreeNode>
            )
        } else {
            return <TreeNode title={fileModel.filename} key={fileModel.id} isLeaf={true}/>
        }
    }

    render() {
        return (
            <ProjectConsumer>
                {(projectContext) => (
                    <div style={{color: "white"}}>
                        <Menu
                            id="simple-menu"
                            style={{position: "absolute", top: 0, left: 0}}
                            open={this.state.isContextMenuVisible}
                            onClose={() => this.setState({isContextMenuVisible: false})}>
                            <MenuItem onClick={() => this.newClass()}>New Class</MenuItem>
                            <MenuItem onClick={() => this.newPackage()}>New Package</MenuItem>
                        </Menu>
                        <Tree selectable={false}
                              onRightClick={(props) => {
                                  if (!props.node.props.isLeaf)
                                      this.setState({
                                          isContextMenuVisible: true,
                                          itemPath: this.nodeMap[props.node.props.eventKey]
                                      })
                              }}
                              defaultExpandAll={true}>
                            {projectContext.project.map((value) => this.renderTree(value))})}
                        </Tree>
                    </div>
                )}
            </ProjectConsumer>
        )
    }
}
