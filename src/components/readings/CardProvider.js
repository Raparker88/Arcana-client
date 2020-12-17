import React, { useState } from "react"

export const CardContext = React.createContext()

export const CardProvider = (props) => {

    const [deck, setDeck] = useState([])
    

    const getDeck = () => {
        return fetch("http://localhost:8000/cards", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setDeck)
    }

    
    return (
        <CardContext.Provider value={{
            deck, getDeck
        }}>
            {props.children}
        </CardContext.Provider>
    )
}