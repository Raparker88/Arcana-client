import React, { useContext, useEffect, useRef } from 'react'
import { UserContext } from "../users/UserProvider"
import "./User.css";


export const UserList = (props) => {
    
    const { searchUsers, users, subscribeToUser, unSubscribeToUser } = useContext(UserContext)

    const search = useRef(null)


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
                return 
                <>
                    <div>{user.username}</div>
                    {user.subscribed? 
                    <button onClick={evt => {
                        subscribeToUser(user.id)
                    }}
                    className="subscribe-btn">Follow</button>
                    :<button onClick={evt => {
                        unSubscribeToUser(user.id)
                    }}
                    className="subscribe-btn">Unfollow</button>
                    }
                </>
            })}
        </div>

        </>
    )
}