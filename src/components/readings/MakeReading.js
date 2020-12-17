import React, { useContext, useEffect } from 'react'
import { CardContext } from './CardProvider'
import { FiveCardCross } from './FiveCardCross'
import "./Reading.css";


export const MakeReading = (props) => {
    const { deck, getDeck } = useContext(CardContext)

    useEffect(() => {
        getDeck()
    }, [])
    
    return (
        <>
        <div className="layout-container">
            <FiveCardCross fiveCardArr={deck.slice(-5)}/>
        </div>
        <div className="deck-fill">
            <div className="deck-container">
                <div>
                    <img className="deck-img"
                     src="http://localhost:8000/media/cardimages/card_back.jpeg"></img>
                </div>
                <div className="deck-btn-container">
                    <div>
                        <button onClick={()=> {
                        getDeck()
                        .then(() => console.log(deck))
                        }}
                        className="shuffle-btn">Shuffle Deck</button>
                    </div>
                    <div>
                        <button onClick={()=> {
                        }}
                        className="deal-btn">Deal</button>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}