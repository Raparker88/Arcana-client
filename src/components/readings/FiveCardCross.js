import React, { useContext, useEffect } from 'react'
import { ReadingContext } from "./ReadingProvider"
import "./Reading.css";


export const FiveCardCross = ({fiveCardArr}) => {
    const { positions, getPositionsByLayout } = useContext(ReadingContext)

    useEffect(() => {
        getPositionsByLayout(1)
    }, [])

    
    return (
        <>
        <div className="five-card-container">
            <div className="five-card">
                <img className={fiveCardArr[1] && fiveCardArr[1].inverted? "deck-img-flipped": "deck-img"}
                     src={fiveCardArr[1] && fiveCardArr[1].card_image}></img>
                <div className="position-explanation">
                    <h4>position: {positions[4].name}</h4>
                    <p>{positions[4].explanation}</p>
                    <h4>card: {fiveCardArr[1].name}</h4>
                    <p>{fiveCardArr[1].inverted?
                        fiveCardArr[1].inverted_explanation :
                        fiveCardArr[1].explanation}</p>
                </div>
            </div>
            <div className="five-card-middle">
                <div className="five-card">
                    <img className={fiveCardArr[4] && fiveCardArr[4].inverted? "deck-img-flipped": "deck-img"}
                        src={fiveCardArr[4] && fiveCardArr[4].card_image}></img>
                    <div className="position-explanation">
                        <h4>position: {positions[1].name}</h4>
                        <p>{positions[1].explanation}</p>
                        <h4>card: {fiveCardArr[4].name}</h4>
                        <p>{fiveCardArr[4].inverted?
                            fiveCardArr[4].inverted_explanation :
                            fiveCardArr[4].explanation}</p>
                    </div>
                </div>
                <div className="five-card">
                    <img className={fiveCardArr[3].inverted? "deck-img-flipped": "deck-img"}
                        src={fiveCardArr[3].card_image}></img>
                    <div className="position-explanation">
                        <h4>position: {positions[2].name}</h4>
                        <p>{positions[2].explanation}</p>
                        <h4>card: {fiveCardArr[3].name}</h4>
                        <p>{fiveCardArr[3].inverted?
                            fiveCardArr[3].inverted_explanation :
                            fiveCardArr[3].explanation}</p>
                    </div>
                </div>
                <div className="five-card">
                    <img className={fiveCardArr[2].inverted? "deck-img-flipped": "deck-img"}
                        src={fiveCardArr[2].card_image}></img>
                    <div className="position-explanation">
                        <h4>position: {positions[3].name}</h4>
                        <p>{positions[3].explanation}</p>
                        <h4>card: {fiveCardArr[2].name}</h4>
                        <p>{fiveCardArr[2].inverted?
                            fiveCardArr[2].inverted_explanation :
                            fiveCardArr[2].explanation}</p>
                    </div>
                </div>
            </div>
            <div className="five-card">
            <img className={fiveCardArr[0].inverted? "deck-img-flipped": "deck-img"}
                    src={fiveCardArr[0].card_image}></img>
                <div className="position-explanation">
                    <h4>position: {positions[5].name}</h4>
                    <p>{positions[5].explanation}</p>
                    <h4>card: {fiveCardArr[0].name}</h4>
                    <p>{fiveCardArr[0].inverted?
                        fiveCardArr[0].inverted_explanation :
                        fiveCardArr[0].explanation}</p>
                </div>
            </div>

        </div>
        </>
    )
}