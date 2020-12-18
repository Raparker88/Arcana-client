import React, { useContext, useEffect, useState, useRef } from 'react'
import { CardContext } from './CardProvider'
import { ReadingContext } from './ReadingProvider'
import { FiveCardCross } from './FiveCardCross'
import "./Reading.css";


export const MakeReading = (props) => {
    const { deck, getDeck } = useContext(CardContext)
    const { addReading } = useContext(ReadingContext)
    const [deal, setDeal] = useState(false)
    const [fiveCardArr, setFive] = useState([{}, {}, {}, {}, {}])

    const notes = useRef(null)
    const saveReadingDialog = useRef(null)
    const title = useRef(null)

    useEffect(() => {
        getDeck()
    }, [])

    useEffect(() => {
        if (deck.length > 0) {
            let cards = deck.slice(-5)
            cards[0].position_id = 5
            cards[1].position_id = 4
            cards[2].position_id = 3
            cards[3].position_id = 2
            cards[4].position_id = 1
            setFive(cards)
        }
    }, [deck])

    const constructReading = () => {
        let newReading = {
            name: title.current.value,
            layout_id: 1,
            notes: notes.current.value,
            cards: fiveCardArr
        }
        addReading(newReading)
        .then(() => props.history.push("my_readings"))
    }

    return (
        <>
            <div className={deal ? "layout-container" : "layout-hidden"}>
                <FiveCardCross fiveCardArr={fiveCardArr} />
            </div>
            <div className="deck-fill">
                <div className="deck-container">
                    <div>
                        <img className="deck-img"
                            src="http://localhost:8000/media/cardimages/card_back.jpeg"></img>
                    </div>
                    <div className="deck-btn-container">
                        <div>
                            <button onClick={() => {
                                getDeck()

                            }}
                                className="shuffle-btn" id="shuffle-button">
                                Shuffle Deck</button>
                        </div>
                        <div>
                            <button onClick={() => {
                                setDeal(true)
                                document.getElementById("shuffle-button").disabled = true
                            }}
                                className="deal-btn">Deal</button>
                        </div>
                    </div>
                </div>
                <div className="form-container">
                    <form className="scheduleForm" id="seedScheduleForm">
                        <h2>Notes</h2>
                        <fieldset>
                            <div className="form-group">
                                <textarea type="text" id="notes" ref={notes} required autoFocus className="form-control"
                                    placeholder="write notes here" />
                            </div>
                        </fieldset>
                        <dialog className="dialog dialog--reading" ref={saveReadingDialog}>
                            <fieldset>
                                <h3>Save a title with this reading</h3>
                                <div className="form-group">
                                    <input type="text" id="title" ref={title} required autoFocus className="form-control"
                                        placeholder="" />
                                </div>
                            </fieldset>
                            <button type="submit" id="save"
                                onClick={evt => {
                                    evt.preventDefault()
                                    constructReading()
                                }}
                                className="btn submitButton">
                                    Save
                            </button>
                        </dialog>

                        <button id="save-reading"
                            onClick={evt => {
                                saveReadingDialog.current.showModal()
                            }}
                            className="reading-btn">
                            Save Reading
                        </button>
                    </form>

                </div>

            </div>
        </>
    )
}