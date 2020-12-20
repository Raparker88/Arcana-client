import React, { useContext, useEffect } from 'react'
import { UserContext } from "../users/UserProvider"
import "./User.css";


export const UserProfile = (props) => {
    const { currentUser, getCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser()
    },[]) 
    
    return (
        <>
        <div className="user-container">
            <div className="profileImg-container">
                {currentUser.profile_image? 
                <img className="profile-image"
                src={currentUser.profile_image}></img>:
                null}
            </div>
            <div className="user-info">
                <h2>Info</h2>
                <h2>{currentUser.full_name}</h2>
                <h2>Username: {currentUser.username}</h2>
                <p>Bio: {currentUser.bio}</p>
                <p>Astrological Sign: {currentUser.astrology.name}</p>
            </div>

        </div>
            
        </>
    )
}