import React, {Component} from "react"
import {Defaults} from "../../config"
import {ProgrammingLanguage} from "../../models"
import AceEditor from "react-ace"
import ReactResizeDetector from "react-resize-detector"

import "brace/mode/java"
import "brace/mode/javascript"
import "brace/mode/typescript"
import "brace/theme/ambiance"
import "brace/theme/clouds_midnight"
import "brace/theme/dracula"
import "brace/theme/gruvbox"
import "brace/theme/idle_fingers"
import "brace/theme/kr_theme"
import "brace/theme/merbivore"
import "brace/theme/merbivore_soft"
import "brace/theme/tomorrow_night"
import "brace/theme/tomorrow_night_bright"
import "brace/theme/tomorrow_night_eighties"
import "brace/theme/twilight"
import "brace/theme/vibrant_ink"
import "brace/ext/beautify"
import "brace/ext/themelist"

export interface ICodePreviewPanelProps {
    language: ProgrammingLanguage,
    code: string | undefined
}

export interface ICodePreviewPanelState {
}

export class CodePreviewPanel extends Component<ICodePreviewPanelProps, ICodePreviewPanelState> {
    static defaultProps: ICodePreviewPanelProps = {
        language: Defaults.PROGRAMMING_LANGUAGE,
        code: undefined
    }

    constructor(props: ICodePreviewPanelProps) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <ReactResizeDetector
                handleWidth
                handleHeight
                refreshRate={300}
                refreshMode="throttle"
                render={({width, height}) =>
                    <div style={{height: "100%", width: "100%", backgroundColor: "#1d1f21"}}>
                        <AceEditor
                            mode="javascript"
                            theme="tomorrow_night"
                            name="blah2"
                            fontSize={14}
                            height={(height - 40) + "px"}
                            width={width + "px"}
                            wrapEnabled
                            value={this.props.code}
                            setOptions={{
                                dragEnabled: false,
                                readOnly: true,
                                highlightActiveLine: false,
                                useWorker: false
                            }}/>
                    </div>
                }/>
        )

    }
}
