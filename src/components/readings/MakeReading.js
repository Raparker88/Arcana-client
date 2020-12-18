import React, { useContext, useEffect, useState } from 'react'
import { CardContext } from './CardProvider'
import { FiveCardCross } from './FiveCardCross'
import "./Reading.css";


export const MakeReading = (props) => {
    const { deck, getDeck } = useContext(CardContext)
    const [deal, setDeal] = useState(false)

    useEffect(() => {
        getDeck()
    }, [])
    
    return (
        <>
        <div className={deal?"layout-container": "layout-hidden"}>
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
            
                        }}
                        className= "shuffle-btn" id="shuffle-button">
                            Shuffle Deck</button>
                    </div>
                    <div>
                        <button onClick={()=> {
                            setDeal(true)
                            document.getElementById("shuffle-button").disabled = true
                        }}
                        className="deal-btn">Deal</button>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}