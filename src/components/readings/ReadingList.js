import React, { useContext, useEffect } from 'react'
import { ReadingContext } from "./ReadingProvider"
import { UserContext } from "../users/UserProvider"
import "./Reading.css";


export const ReadingList = () => {
    const { getReadingsByUser, readings } = useContext(ReadingContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser()
    },[]) 
    
    useEffect(() => {
        getReadingsByUser(currentUser.id)
    }, [currentUser])

    
    return (
        <>
            <h2>My Readings</h2>
            {readings.map(reading => {
                return <div key={reading.id} className="reading-list-detail" 
                onClick={()=> props.history.push(`/readings/${reading.id}`)}>
                    <div >{reading.name}</div>
                    <div>{new Date(reading.date_created).toDateString()}</div>
                </div>
            })}
        </>
    )
}