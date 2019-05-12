import React, {Component} from "react"
import Tree, {TreeNode} from "rc-tree"
import "rc-tree/assets/index.css"
import {FileModel} from "../../models/FileModel"
import {ProjectConsumer} from "../../stores/ProjectStore"

export interface IProjectTreePanelProps {
}

export interface IProjectTreePanelState {
}

export class ProjectTreePanel extends Component<IProjectTreePanelProps, IProjectTreePanelState> {
    static defaultProps: IProjectTreePanelProps = {}
    index = 0

    constructor(props: IProjectTreePanelProps) {
        super(props)
        this.state = {}
    }

    renderTree = (fileModel: FileModel) => {
        if (fileModel.isDir) {
            return (
                <TreeNode title={fileModel.filename} key={fileModel.filename}>
                    {fileModel.children.map((value) => this.renderTree(value))}
                </TreeNode>
            )
        } else {
            return <TreeNode title={fileModel.filename} key={this.index++}/>
        }
    }

    render() {
        return (
            <ProjectConsumer>
                {(projectContext) => (
                    <div style={{color: "white"}}>
                        <Tree
                            selectable={false}
                            defaultExpandAll={false}>
                            {projectContext.project.map((value) => this.renderTree(value))})}
                        </Tree>
                    </div>
                )}
            </ProjectConsumer>
        )
    }
}
