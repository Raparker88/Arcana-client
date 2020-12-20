import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../users/UserProvider"
import "./User.css";


export const UserProfile = (props) => {
    const { currentUser, getCurrentUser, patchProfile } = useContext(UserContext)
    const [base64, setBase64] = useState(null)
    const [user, setUser] = useState({astrology:{}})

    useEffect(() => {
        getCurrentUser()
        .then(setUser)
    },[])
    
    useEffect(() => {
        if(base64 != null){
            patchProfile({profile_image: base64})
            .then(getCurrentUser)
        }
    },[base64])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createProfileImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64(base64ImageString)
        });
    }
    
    return (
        <>
        <div className="user-container">
            <div className="profileImg-container">
                {user.profile_image !=null? 
                <img className="profile-image"
                src={user.profile_image}></img>:
                null}
                {user.id === currentUser.id? 
                <div>
                <label htmlFor="profile_img">Change Profile Image</label>
                    <input type="file" id="profle_image" name="profile_img"
                        onChange={(evt) => {
                            createProfileImageJSON(evt)
                    }} /></div>
                    :null
                }
            </div>
            <div className="user-info">
                <h2>Info</h2>
                <h2>{user.full_name}</h2>
                <h2>Username: {user.username}</h2>
                <p>Bio: {user.bio}</p>
                <p>Astrological Sign: {user.astrology.name}</p>
            </div>

        </div>
            
        </>
    )
}