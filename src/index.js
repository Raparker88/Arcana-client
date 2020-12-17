import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Arcana } from "./components/Arcana.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Arcana />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)

