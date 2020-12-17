import React, { useContext, useEffect } from 'react'
import "./Reading.css";


export const FiveCardCross = ({fiveCardArr}) => {

    
    return (
        <>
        <div className="five-card-container">
            <div className="five-card card4">
                <img className="card4-img deck-img"
                     src={fiveCardArr[1] && fiveCardArr[1].card_image}></img>
            </div>
            <div className="five-card-middle">
                <div className="five-card 1">
                    <img className="deck-img"
                        src={fiveCardArr[4] && fiveCardArr[4].card_image}></img>
                </div>
                <div className="five-card 2">
                    <img className="deck-img"
                        src={fiveCardArr[3] && fiveCardArr[3].card_image}></img>
                </div>
                <div className="five-card 3">
                    <img className="deck-img"
                        src={fiveCardArr[2] && fiveCardArr[2].card_image}></img>
                </div>
            </div>
            <div className="five-card card5">
            <img className="card5-img deck-img"
                    src={fiveCardArr[0] && fiveCardArr[0].card_image}></img>
            </div>

        </div>
        </>
    )
}