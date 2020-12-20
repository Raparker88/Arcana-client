import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../users/UserProvider"
import "./User.css";


export const UserProfile = (props) => {
    const { currentUser, getCurrentUser, patchProfile } = useContext(UserContext)
    const [base64, setBase64] = useState(null)


    useEffect(() => {
        getCurrentUser()
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
                {currentUser.profile_image !=null? 
                <img className="profile-image"
                src={currentUser.profile_image}></img>:
                null}
                <label htmlFor="profile_img">Change Profile Image</label>
                    <input type="file" id="profle_image" name="profile_img"
                        onChange={(evt) => {
                            createProfileImageJSON(evt)
                    }} />
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