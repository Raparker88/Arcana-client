import React, { useContext, useEffect, useState, useRef } from 'react'
import { ReadingContext } from './ReadingProvider'
import { FiveCardCross } from './FiveCardCross'
import "./Reading.css";


export const ReadingDetails = (props) => {
    const { getReadingById, reading } = useContext(ReadingContext)
    const [fiveCardArr, setFive] = useState([{}, {}, {}, {}, {}])


    useEffect(() => {
        const readingId = parseInt(props.match.params.readingId)
        getReadingById(readingId)
    }, [])

    useEffect(() => {
        if(reading.hasOwnProperty("cardreadings")){

            let newArr = []
            let cardObj={}
            reading.cardreadings.forEach(cr => {
                cr.card.inverted = cr.inverted
                cardObj[cr.position_id] = cr.card
            })
            newArr.push(cardObj[5])
            newArr.push(cardObj[4])
            newArr.push(cardObj[3])
            newArr.push(cardObj[2])
            newArr.push(cardObj[1])
            setFive(newArr)
        }
    },[reading])



    return (
        <>
        <div className="reading-detail-container">
            <div className="title-date">
                <h2>{reading.name} {new Date(reading.date_created).toDateString()}</h2>
            </div>
            <div className="reading-notes">
                {reading.notes}
            </div>
            <div className="layout-container">
                <FiveCardCross fiveCardArr={fiveCardArr} />
            </div>
        </div>

        </>
    )
}