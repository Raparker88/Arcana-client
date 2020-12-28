import React, { useState } from "react"

export const ReadingContext = React.createContext()

export const ReadingProvider = (props) => {

    const [positions, setPositions] = useState({1:{}, 2:{}, 3:{}, 4:{}, 5:{}})
    const [readings, setReadings] = useState([])
    const [reading, setReading] = useState({})
    

    const getPositionsByLayout = (layoutId) => {
        return fetch(`http://localhost:8000/positions?layout=${layoutId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(array => {
                let positionObj = {}
                array.forEach(position => {
                    positionObj[position.id] = position
                })
                setPositions(positionObj)
            })
    }
    const addReading = reading => {
        return fetch("http://localhost:8000/readings", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reading)
        })
            
    }
    const getReadingsByUser = (userId) => {
        return fetch(`http://localhost:8000/readings?tarotuser_id=${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setReadings)
    }

    const getReadingById = (readingId) => {
        return fetch(`http://localhost:8000/readings/${readingId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setReading)
    }
    const shareReading = (readingId) => {
        return fetch(`http://localhost:8000/readings/${readingId}/share`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(() => getReadingById(readingId))
    }

    const getSubscriptions = () => {
        return fetch(`http://localhost:8000/users/subscriptions`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setReadings)
    }

    const editReading = (readingObj) => {
        return fetch(`http://localhost:8000/readings/${readingObj.id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(readingObj)
        })
            .then(() => getReadingById(readingObj.id))
    }

    const deleteReading = readingId => {
        return fetch(`http://localhost:8000/readings/${readingId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${localStorage.getItem("ar_token")}`},
        })
    }

    
    return (
        <ReadingContext.Provider value={{
            positions, getPositionsByLayout, addReading, getReadingsByUser, readings,
            getReadingById, reading, getSubscriptions, shareReading, editReading, deleteReading
        }}>
            {props.children}
        </ReadingContext.Provider>
    )
}