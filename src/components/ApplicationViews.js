import React from "react"
import { Route } from "react-router-dom"
import { UserProvider } from "./users/UserProvider"
import { Card } from "./home/CardOfDay"
import { CardProvider } from "./readings/CardProvider"
import { MakeReading } from "./readings/MakeReading"
import { ReadingProvider } from "./readings/ReadingProvider"
import { ReadingList } from "./readings/ReadingList"
import { ReadingDetails } from "./readings/ReadingDetail"
import { UserProfile } from "./users/UserProfile"


export const ApplicationViews = () => {
    return <>
        <UserProvider>
            <Route exact path="/" render={props =>
                <Card {...props} />} />
            <CardProvider>
                <ReadingProvider>
                    <Route exact path="/reading" render={props =>
                        <MakeReading {...props} />} />
                    <Route exact path="/my_readings" render={props =>
                        <ReadingList {...props} />} />
                     <Route path="/readings/:readingId(\d+)" render={props => 
                        <ReadingDetails {...props} />} />      
                </ReadingProvider>
            </CardProvider>
            <Route exact path="/my_profile" render={props =>
                <UserProfile {...props} />} />
        </UserProvider>
        
    </>
}
