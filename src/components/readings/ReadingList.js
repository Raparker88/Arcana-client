import React, { useContext, useEffect } from 'react'
import { ReadingContext } from "./ReadingProvider"
import { UserContext } from "../users/UserProvider"
import "./Reading.css";
import { UserList } from '../users/UserList'


export const ReadingList = (props) => {
    const { getReadingsByUser, readings, getSubscriptions } = useContext(ReadingContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    let route= props.location.pathname

    useEffect(() => {
        getCurrentUser()
    },[]) 
    
    useEffect(() => {
        if(route === "/readings"){
            getSubscriptions()
        }else{
            getReadingsByUser(currentUser.id)

        }
    }, [currentUser])

    
    return (
        <>
            <h2 className="title">{route === "/readings"? "Readings": "My Readings"}</h2>
            <div className="user-reading-container">
                <div className="readingList-detail-container">
                    {readings.map(reading => {
                        return <div key={reading.id} className="reading-list-detail" 
                        onClick={()=> props.history.push(`/readings/${reading.id}`)}>
                            <div className="reading-name">{reading.name}</div>
                            <div>•  {new Date(reading.date_created).toDateString()}</div>
                        </div>
                    })}

                </div>
                {route === "/readings"?  <UserList {...props} />: null}
            </div>
        </>
    )
}