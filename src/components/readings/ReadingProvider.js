import React, { useState } from "react"

export const ReadingContext = React.createContext()

export const ReadingProvider = (props) => {

    const [positions, setPositions] = useState({1:{}, 2:{}, 3:{}, 4:{}, 5:{}})
    

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

    
    return (
        <ReadingContext.Provider value={{
            positions, getPositionsByLayout
        }}>
            {props.children}
        </ReadingContext.Provider>
    )
}