import React, { useContext, useEffect, useRef } from 'react'
import { CommentContext } from "./CommentProvider"
import "./Comment.css";


export const CommentList = (props) => {
    const { addComment, getCommentsByReading, comments } = useContext(CommentContext)
    const comment = useRef(null)

    useEffect(() => {
        const readingId = parseInt(props.match.params.readingId)
        getCommentsByReading(readingId)
    }, [])

    const handleSubmit = () => {
        const readingId = parseInt(props.match.params.readingId)
        addComment({
            reading_id: readingId,
            comment: comment.current.value
        })
            .then(() => getCommentsByReading(readingId))
            .then(() => document.getElementById("comment-form-id").reset())
    }

    return (
        <>
            <h2>Comments</h2>
            <form className="comment-form" id="comment-form-id">
                <fieldset>
                    <div className="form-group">
                        <textarea type="text" id="comment" ref={comment} required autoFocus className="form-control"
                            placeholder="add a comment" />
                    </div>
                </fieldset>
                <button type="submit" id="add-comment"
                    onClick={evt => {
                        evt.preventDefault()
                        handleSubmit()
                    }}
                    className="fa fa-plus">
                </button>
            </form>
            {comments.map(comment => {
                return <div key={comment.id} className="comment-detail">
                    <div>{comment.tarotuser && comment.tarotuser.username}</div>
                    <div>{new Date(comment.date_created).toDateString()}</div>
                    <div >{comment.comment}</div>
                </div>
            })}
        </>
    )
}