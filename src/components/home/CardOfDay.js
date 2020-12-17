import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider';
import "./Home.css";


export const Card = (props) => {
    const{getCurrentUser, currentUser} = useContext(UserContext)
    const [inverted, setInverted] = useState(false)

    useEffect(() => {
        getCurrentUser()
    }, [])
    useEffect(() => {
        setInverted(currentUser.card_of_day_inverted)
    },[currentUser])


    return (
        <>
            <div className="card-container">
                <h2>Your Card Of The Day</h2>
                <div>
                    <img className={inverted ? "card-img-flipped": "card-img"}
                     src={currentUser.card_of_day.card_image}></img>
                </div>
                {currentUser.card_of_day_inverted?
                    <div className="card-explanation">
                        <div>{currentUser.card_of_day.inverted_explanation}</div>
                    </div>
                    :<div className="card-explanation">
                    <div>{currentUser.card_of_day.explanation}</div>
                    </div>
                
                }
            </div>
        </>
    )
}