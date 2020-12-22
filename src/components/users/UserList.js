import React, { useContext, useEffect, useRef } from 'react'
import { UserContext } from "../users/UserProvider"
import { ReadingContext } from "../readings/ReadingProvider"
import "./User.css";


export const UserList = (props) => {

    const { searchUsers, users, subscribeToUser, unSubscribeToUser, currentUser, getCurrentUser } = useContext(UserContext)
    const { getSubscriptions } = useContext(ReadingContext)
    const search = useRef(null)

    useEffect(() => {
        getCurrentUser()
    },[]) 

    const isSubscribed = (user) => {
        if(currentUser.id === user.id){
            return <div>self</div>
        }
        if (user.subscribed) {
            return <button
                onClick={evt => {
                    unSubscribeToUser(user.id)
                        .then(() => searchUsers(search.current.value))
                        .then(getSubscriptions)
                }}
                className="follow-btn">
                Unfollow
                    </button>
        }else{
            return <button
                onClick={evt => {
                    subscribeToUser(user.id)
                        .then(() => searchUsers(search.current.value))
                        .then(getSubscriptions)

                }}
                className="follow-btn">
                Follow
                        </button>
        }
    }

    return (
        <>
            <form className="searchUser-form">
                <fieldset>
                    <div className="form-group search-div">
                        <input type="text" id="search" ref={search} required autoFocus className="form-control"
                            placeholder="search users" />
                    </div>
                </fieldset>
                <button type="submit" id="save"
                    onClick={evt => {
                        evt.preventDefault()
                        searchUsers(search.current.value)
                    }}
                    className="btn fa fa-search"></button>

            </form>
            <div className="user-list">
                {users.map(user => {
                    return <div key={user.id}>
                        <div onClick={evt => props.history.push(`/users/${user.id}`)}>
                            {user.username}</div>
                        <div>
                            {isSubscribed(user)}
                        </div>
                        
                    </div>
                })}

            </div>

        </>
    )
}