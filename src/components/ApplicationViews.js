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
import { CommentProvider } from "./comments/CommentProvider"


export const ApplicationViews = () => {
    return <>
        <UserProvider>
            <Route exact path="/" render={props =>
                <Card {...props} />} />
            <CardProvider>
                <ReadingProvider>
                    <CommentProvider>
                        <Route path="/readings/:readingId(\d+)" render={props => 
                        <ReadingDetails {...props} />} />      
                    </CommentProvider>
                    <Route exact path="/reading" render={props =>
                        <MakeReading {...props} />} />
                    <Route exact path="/my_readings" render={props =>
                        <ReadingList {...props} />} />
                    <Route exact path="/readings" render={props =>
                        <ReadingList {...props} />} />
                </ReadingProvider>
            </CardProvider>
            <Route exact path="/my_profile" render={props =>
                <UserProfile {...props} />} />
        </UserProvider>
        
    </>
}
