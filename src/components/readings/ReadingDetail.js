import React, { useContext, useEffect, useState, useRef } from 'react'
import { ReadingContext } from './ReadingProvider'
import { UserContext } from '../users/UserProvider'
import { FiveCardCross } from './FiveCardCross'
import { CommentList } from '../comments/CommentsList'
import "./Reading.css";


export const ReadingDetails = (props) => {
    const { getReadingById, reading, shareReading } = useContext(ReadingContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)
    const [fiveCardArr, setFive] = useState([{}, {}, {}, {}, {}])


    useEffect(() => {
        getCurrentUser()
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
                {currentUser.id === reading.tarotuser_id?
                <button  onClick={evt => {
                    shareReading(reading.id)
                }}
                className="reading-btn">
                {reading.shared? "Unshare": "Share"}
            </button>: null}
            </div>
            <div className="reading-notes">
                {reading.notes}
            </div>
            <div className="layout-container">
                <FiveCardCross fiveCardArr={fiveCardArr} />
            </div>
            <div className="comments-container">
                <CommentList {...props}/>
            </div>
        </div>

        </>
    )
}