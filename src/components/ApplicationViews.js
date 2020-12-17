import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./users/UserProvider"
import { Card } from "./home/CardOfDay"


export const ApplicationViews = () => {
    return <>
        <UserProvider>
            <Route exact path="/" render={props =>
                <Card {...props} />} />
        </UserProvider>
        
    </>
}
