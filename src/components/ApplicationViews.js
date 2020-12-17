import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./users/UserProvider"
import { Card } from "./home/CardOfDay"
import { CardProvider } from "./readings/CardProvider"
import { MakeReading } from "./readings/MakeReading"


export const ApplicationViews = () => {
    return <>
        <UserProvider>
            <Route exact path="/" render={props =>
                <Card {...props} />} />
            <CardProvider>
                <Route exact path="/reading" render={props =>
                    <MakeReading {...props} />} />
            </CardProvider>
        </UserProvider>
        
    </>
}
