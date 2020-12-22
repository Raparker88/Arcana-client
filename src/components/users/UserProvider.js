import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [currentUser, setCurrentUser] = useState({astrology:{}, card_of_day:{}})
    const [users, setUsers] = useState([])

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((res) => {
                setCurrentUser(res)
                return res
            })
    }
    const getUserById = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                return res})
    }

    const searchUsers = (queryString) => {
        return fetch(`http://localhost:8000/users?name=${queryString}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }


    const patchProfile = obj => {
        return fetch(`http://localhost:8000/users`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })

    }
    const subscribeToUser = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}/subscription`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
           
    }

    const unSubscribeToUser = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}/subscription`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
           
    }

    
    return (
        <UserContext.Provider value={{
            currentUser, getCurrentUser, patchProfile, searchUsers, users, subscribeToUser,
             unSubscribeToUser, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}