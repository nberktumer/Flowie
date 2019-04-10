import React, {Component} from "react"
import Tree, {TreeNode} from "rc-tree"
import "rc-tree/assets/index.css"

export interface IProjectTreePanelProps {
}

export interface IProjectTreePanelState {
}

export class ProjectTreePanel extends Component<IProjectTreePanelProps, IProjectTreePanelState> {
    static defaultProps: IProjectTreePanelProps = {}

    constructor(props: IProjectTreePanelProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <div style={{color: "white"}}>
            <Tree
                selectable={false}
                defaultExpandAll={false}
                defaultExpandedKeys={["p1"]}>
                <TreeNode title="parent 1" key="p1">
                    <TreeNode key="p10" title="leaf"/>
                    <TreeNode title="parent 1-1" key="p11">
                        <TreeNode title="parent 2-1" key="p21">
                            <TreeNode title="leaf"/>
                            <TreeNode title="leaf"/>
                        </TreeNode>
                        <TreeNode key="p22" title="leaf"/>
                    </TreeNode>
                </TreeNode>
            </Tree>
        </div>
    }
}
