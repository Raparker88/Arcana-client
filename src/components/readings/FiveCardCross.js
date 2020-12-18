import React, { useContext, useEffect } from 'react'
import "./Reading.css";


export const FiveCardCross = ({fiveCardArr}) => {

    
    return (
        <>
        <div className="five-card-container">
            <div className="five-card">
                <img className={fiveCardArr[1].inverted? "deck-img-flipped": "deck-img"}
                     src={fiveCardArr[1] && fiveCardArr[1].card_image}></img>
            </div>
            <div className="five-card-middle">
                <div className="five-card">
                    <img className={fiveCardArr[4].inverted? "deck-img-flipped": "deck-img"}
                        src={fiveCardArr[4] && fiveCardArr[4].card_image}></img>
                </div>
                <div className="five-card">
                    <img className={fiveCardArr[3].inverted? "deck-img-flipped": "deck-img"}
                        src={fiveCardArr[3] && fiveCardArr[3].card_image}></img>
                </div>
                <div className="five-card">
                    <img className={fiveCardArr[2].inverted? "deck-img-flipped": "deck-img"}
                        src={fiveCardArr[2] && fiveCardArr[2].card_image}></img>
                </div>
            </div>
            <div className="five-card">
            <img className={fiveCardArr[0].inverted? "deck-img-flipped": "deck-img"}
                    src={fiveCardArr[0] && fiveCardArr[0].card_image}></img>
            </div>

        </div>
        </>
    )
}