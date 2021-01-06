import React, { useContext, useEffect, useState, useRef } from 'react'
import { UserContext } from "../users/UserProvider"
import "./User.css";


export const UserProfile = (props) => {
    const { currentUser, getCurrentUser, patchProfile, getUserById } = useContext(UserContext)
    const [base64, setBase64] = useState(null)
    const [user, setUser] = useState({ astrology: {} })

    const bio = useRef(null)
    const bioDialog = useRef(null)

    const otherUser = props.match.params.hasOwnProperty("userId")


    useEffect(() => {
        if(otherUser){
            getCurrentUser()
            .then(() => getUserById(parseInt(props.match.params.userId)))
            .then(setUser)
        }else{

            getCurrentUser()
            .then(setUser)
        }
    }, [])

    useEffect(() => {
        if (base64 != null) {
            patchProfile({ profile_image: base64 })
                .then(getCurrentUser)
                .then(setUser)
        }
    }, [base64])

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
                    {user.profile_image != null ?
                        <img className="profile-image"
                            src={user.profile_image}></img> :
                        <div className="no-image"></div>}
                    {user.id === currentUser.id ?
                        <div>
                            <label htmlFor="profile_img">Change Profile Image</label>
                            <input type="file" id="profle_image" name="profile_img"
                                onChange={(evt) => {
                                    createProfileImageJSON(evt)
                                }} /></div>
                        : null
                    }
                </div>
                <div className="user-info">
                    <div className="profile-info-edit">
                        <h2>Info</h2>
                        {user.id === currentUser.id?
                        <button className="fa fa-edit profile-edit-btn"
                                onClick={evt => {
                                    bioDialog.current.showModal()
                                }}></button>:null
                        }
                    </div>
                    <h2>{user.full_name}</h2>
                    <h2>Username: {user.username}</h2>
                    <div className="bio-container">
                        <p>Bio: {user.bio}</p>
                        
                    </div>
                    <p>Astrological Sign: {user.astrology.name}</p>
                </div>
                <dialog className="dialog dialog--bio" ref={bioDialog}>
                    <form>
                        <fieldset>
                            <h3>Edit Bio</h3>
                            <div className="form-group">
                                <input type="text" id="bio" ref={bio} required autoFocus className="form-control"
                                    defaultValue={user.bio} />
                            </div>
                        </fieldset>
                        <button type="submit" id="save"
                            onClick={evt => {
                                evt.preventDefault()
                                patchProfile({bio: bio.current.value})
                                .then(getCurrentUser)
                                .then(setUser)
                                .then(() => {
                                    bioDialog.current.close()
                                })
                            }}
                            className="btn submitButton">
                            Save
                                </button>

                    </form>
                </dialog>

            </div>

        </>
    )
}