import React from "react"
import ReactDOM from "react-dom"
import {Editor} from "./pages"
import {Route, BrowserRouter as Router} from "react-router-dom"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render((
    <Router>
        <div>
            <Route path="/" component={Editor} exact/>
        </div>
    </Router>
), document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
