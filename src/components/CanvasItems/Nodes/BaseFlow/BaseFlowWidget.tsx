import * as React from "react"
import {createRef} from "react"
import * as _ from "lodash"
import {BaseWidget, BaseWidgetProps} from "nberktumer-react-diagrams"
import {BaseFlowNode} from "./BaseFlowNode"
import styles from "./BaseFlow.module.css"
import {DefaultPortLabel, DefaultPortLocation, DefaultPortModel} from "../../Ports/DefaultPort"
import Icon from "@material-ui/core/Icon"
import {FlowPropertiesFactory} from "../../../Flows"
import {BasePropertiesState} from "../../../Flows/Base/BaseProperties"
import {BaseVariableFlowNode} from "../../../Flows/Base/BaseVariableFlowNode"
import {FlowConsumer} from "../../../../stores/FlowStore"
import {Card, CardContent, CardHeader, IconButton} from "@material-ui/core"
import strings from "../../../../lang"

export interface RectangleNodeWidgetProps extends BaseWidgetProps {
    node: BaseFlowNode;
}

export interface RectangleNodeWidgetState {
    isPropertiesOpen: boolean,
    height: number,
    width: number
}

export class BaseFlowWidget extends BaseWidget<RectangleNodeWidgetProps, RectangleNodeWidgetState> {
    widgetRef = createRef<HTMLDivElement>()

    constructor(props: RectangleNodeWidgetProps) {
        super("srd-default-node", props)
        this.state = {
            isPropertiesOpen: false,
            height: 0,
            width: 0
        }
    }

    generatePort = (port: DefaultPortModel) => {
        return <DefaultPortLabel model={port} key={port.id}/>
    }

    editClickListener = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        this.props.node.setSelected(false)
        this.setState({isPropertiesOpen: true})
    }

    componentDidMount() {
        if (!this.widgetRef.current)
            return

        const height = this.widgetRef.current.clientHeight
        const width = this.widgetRef.current.clientWidth
        this.setState({height, width})
    }

    render() {
        return (
            <FlowConsumer>
                {(flowContext) => (
                    <div {...this.getProps()} style={{background: this.props.node.color}} ref={this.widgetRef}>
                        <Card className={styles.nodePropertiesWindow}
                              style={{
                                  display: this.state.isPropertiesOpen ? "flex" : "none",
                                  left: this.state.width - 12,
                                  bottom: this.state.height - 12
                              }}>
                            <CardHeader title={strings.properties} action={
                                <IconButton onClick={() => {
                                    this.setState({isPropertiesOpen: false})
                                }}>
                                    <Icon style={{color: "black"}}>close</Icon>
                                </IconButton>
                            }/>
                            <CardContent>
                                {FlowPropertiesFactory.createReadonlyVariableType(this.props.node.flowType, (data: BasePropertiesState) => {
                                    if (!data.errorMessage) {
                                        if (this.props.node instanceof BaseVariableFlowNode) {
                                            // tslint:disable-next-line:prefer-for-of
                                            for (let i = 0; i < flowContext.variableList.length; i++) {
                                                if (flowContext.variableList[i].name === (this.props.node as BaseVariableFlowNode).getVariable().name) {
                                                    flowContext.variableList[i].name = data.variableName
                                                    break
                                                }
                                            }
                                        }
                                        this.props.node.updateNode(data)
                                    }
                                }, this.props.node)}
                            </CardContent>
                        </Card>
                        <div className={styles.rectangleNodeTitle}>
                            <div className={styles.rectangleNodeName}>{this.props.node.name}</div>
                            <Icon onClick={(e) => this.editClickListener(e)} className={styles.editIcon}>edit</Icon>
                        </div>
                        <div className={styles.rectangleNodeInfo}
                             style={{display: this.props.node.info ? "flex" : "none"}}>
                            <div className={styles.rectangleNodeName}>{this.props.node.info}</div>
                        </div>
                        <div className={styles.rectangleNodePorts}>
                            <div className={styles.rectangleNodeIn}>
                                {_.map(this.props.node.getPortListByLocation(DefaultPortLocation.LEFT), this.generatePort.bind(this))}
                            </div>
                            <div className={styles.rectangleNodeOut}>
                                {_.map(this.props.node.getPortListByLocation(DefaultPortLocation.RIGHT), this.generatePort.bind(this))}
                            </div>
                        </div>
                    </div>
                )}
            </FlowConsumer>
        )
    }
}
