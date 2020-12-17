import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [currentUser, setCurrentUser] = useState({astrology:{}, card_of_day:{}})
    

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentUser)
    }

    
    return (
        <UserContext.Provider value={{
            currentUser, getCurrentUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}