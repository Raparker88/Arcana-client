import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../users/UserProvider';
import { CardContext } from './CardProvider'
import "./Reading.css";


export const MakeReading = (props) => {
    const { currentUser } = useContext(UserContext)
    const { deck, getDeck } = useContext(CardContext)

    useEffect(() => {
        getDeck()
    }, [])
    
    return (
        <>
            <div className="deck-container">
                <div>
                    <img className="deck-img"
                     src="http://localhost:8000/media/cardimages/card_back.jpeg"></img>
                </div>
                <button onClick={()=> {
                   getDeck()
                   .then(() => console.log(deck))
                }}
                className="shuffle-btn">Shuffle Deck</button>
            </div>
        </>
    )
}