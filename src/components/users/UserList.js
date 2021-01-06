import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from "../users/UserProvider"
import { ReadingContext } from "../readings/ReadingProvider"
import "./User.css";


export const UserList = (props) => {

    const { searchUsers, users, subscribeToUser, unSubscribeToUser, currentUser,
         getCurrentUser, searchTerms, setTerms } = useContext(UserContext)
    const { getSubscriptions } = useContext(ReadingContext)

    useEffect(() => {
        getCurrentUser()
    },[]) 

    const handleControlledInputChange = (event) => {
        let str = event.target.value
        setTerms(str)
    }

    const isSubscribed = (user) => {
        if(currentUser.id === user.id){
            return null
        }
        if (user.subscribed) {
            return <button
                onClick={evt => {
                    unSubscribeToUser(user.id)
                        .then(() => searchUsers(searchTerms))
                        .then(getSubscriptions)
                }}
                className="follow-btn">
                Unfollow
                    </button>
        }else{
            return <button
                onClick={evt => {
                    subscribeToUser(user.id)
                        .then(() => searchUsers(searchTerms))
                        .then(getSubscriptions)

                }}
                className="follow-btn">
                Follow
                        </button>
        }
    }

    return (
        <>
        <div className="searchUser-container">
            <form className="searchUser-form">
                <div className="form-button">
                    <fieldset>
                    <i  id="save-icon"
                        onClick={evt => {
                            evt.preventDefault()
                            searchUsers(searchTerms)
                        }}
                        className="btn fa fa-search"></i>
                        <div className="form-group search-div">
                            <input type="text" id="user-search" required autoFocus className="form-control"
                                placeholder="search users" 
                                defaultValue={searchTerms}
                                onChange={handleControlledInputChange}
                            />
                        </div>
                    </fieldset>
                    {/* <button type="submit" id="save"
                        onClick={evt => {
                            evt.preventDefault()
                            searchUsers(searchTerms)
                        }}
                        className="btn fa fa-search"></button> */}

                </div>

            </form>

            <div className="user-list">
                {users.map(user => {
                    return <div key={user.id}>
                        <div className="userName-container">
                            <div onClick={evt => props.history.push(`/users/${user.id}`)} className="username">
                                {user.username}</div>
                            <div>
                                {isSubscribed(user)}
                            </div>

                        </div>
                        
                    </div>
                })}

            </div>
        </div>

        </>
    )
}