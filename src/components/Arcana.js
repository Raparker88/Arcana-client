import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/Nav"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const Arcana = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("ar_token")) {
                return <>
                    <Route render={NavBar} />
                    <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={props => <Register {...props}/>} />
    </>
)