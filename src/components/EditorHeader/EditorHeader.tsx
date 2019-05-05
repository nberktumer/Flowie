import React, {Component} from "react"
import {AppBar, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core"
import styles from "./EditorHeader.module.css"
import strings from "../../lang"

export interface EditorHeaderProps {
    onClickListener: (item: string) => void
}

export interface EditorHeaderState {
    anchorEl: ((element: HTMLElement) => HTMLElement) | HTMLElement | undefined | null,
}

export class EditorHeader extends Component<EditorHeaderProps, EditorHeaderState> {
    static defaultProps = {
        onClickListener: () => {
        }
    }

    constructor(props: EditorHeaderProps) {
        super(props)

        this.state = {
            anchorEl: null
        }
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar className={styles.toolbar}>
                    <div className={styles.container}>
                        <Typography
                            className={styles.clickable}
                            variant="overline"
                            aria-owns={Boolean(this.state.anchorEl) ? "menu-appbar" : undefined}
                            aria-haspopup="true"
                            onClick={this.handleFileMenu}
                            color="inherit">
                            {strings.file}
                        </Typography>
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={() => this.handleClick("new")}>{strings.new}</MenuItem>
                            <MenuItem onClick={() => this.handleClick("save")}>{strings.save}</MenuItem>
                            <MenuItem onClick={() => this.handleClick("load")}>{strings.load}</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }

    private handleClick = (item: string) => {
        this.props.onClickListener(item)
        this.setState({anchorEl: null})
    }

    private handleFileMenu = (event: any) => {
        this.setState({anchorEl: event.currentTarget})
    }

    private handleClose = () => {
        this.setState({anchorEl: null})
    }
}
