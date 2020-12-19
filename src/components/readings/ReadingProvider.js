import React, { useState } from "react"

export const ReadingContext = React.createContext()

export const ReadingProvider = (props) => {

    const [positions, setPositions] = useState({1:{}, 2:{}, 3:{}, 4:{}, 5:{}})
    const [readings, setReadings] = useState([])
    

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

    
    return (
        <ReadingContext.Provider value={{
            positions, getPositionsByLayout, addReading, getReadingsByUser, readings
        }}>
            {props.children}
        </ReadingContext.Provider>
    )
}