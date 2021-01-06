import React, { useContext, useEffect, useState, useRef } from 'react'
import { ReadingContext } from './ReadingProvider'
import { UserContext } from '../users/UserProvider'
import { FiveCardCross } from './FiveCardCross'
import { CommentList } from '../comments/CommentsList'
import "./Reading.css";


export const ReadingDetails = (props) => {
    const { getReadingById, reading, shareReading, editReading, deleteReading } = useContext(ReadingContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)
    const [fiveCardArr, setFive] = useState([{}, {}, {}, {}, {}])

    const editReadingDialog = useRef(null)
    const notes = useRef(null)
    const title = useRef(null)

    useEffect(() => {
        getCurrentUser()
        const readingId = parseInt(props.match.params.readingId)
        getReadingById(readingId)
    }, [])

    useEffect(() => {
        if (reading.hasOwnProperty("cardreadings")) {

            let newArr = []
            let cardObj = {}
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
    }, [reading])



    return (
        <>
            <div className="reading-detail-container">
                <div className="title-date">
                    <h2>{reading.name} {new Date(reading.date_created).toDateString()}</h2>
                    {currentUser.id === reading.tarotuser_id ?
                        <div className="titleButtons">
                            <button onClick={evt => {
                                shareReading(reading.id)
                            }}
                                className="title-btn share-btn">
                                {reading.shared ? "Unshare" : "Share"}
                            </button>
                            <button onClick={evt => {
                                editReadingDialog.current.showModal()

                            }}
                                className="title-btn fa fa-edit btn-comment">
                            </button>
                            <button onClick={evt => {
                                deleteReading(reading.id)
                                .then(props.history.push('/my_readings'))
                            }}
                                className="title-btn fa fa-trash btn-comment">
                            </button>
                        </div> : null}
                </div>
                <div className="reading-notes">
                    notes: {reading.notes}
                </div>
                <div className="layout-container">
                    <FiveCardCross fiveCardArr={fiveCardArr} />
                </div>
                <div className="comments-container">
                    <CommentList {...props} />
                </div>
                <dialog className="dialog dialog--editReading" ref={editReadingDialog}>
                    <form>
                        <h3>Edit Reading</h3>
                        <fieldset>
                            <div className="form-group">
                                <input type="text" id="readingTitle" ref={title} required autoFocus className="form-control"
                                    defaultValue={reading.name} />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <textarea type="text" id="readingNotes" ref={notes} required autoFocus className="form-control"
                                    defaultValue={reading.notes} />
                            </div>
                        </fieldset>
                        <button type="submit" id="save"
                            onClick={evt => {
                                evt.preventDefault()
                                editReading({
                                    id: parseInt(props.match.params.readingId),
                                    notes: notes.current.value,
                                    name: title.current.value
                                })
                                    .then(() => {
                                        editReadingDialog.current.close()
                                    })
                            }}
                            className="btn submitButton">
                            Save
                                </button>

                    </form>
                        <button 
                            onClick={evt => {
                               editReadingDialog.current.close()
                            }}
                            className="btn closeButton">
                            Close
                                </button>
                </dialog>
            </div>

        </>
    )
}