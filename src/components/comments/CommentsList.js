import React, { useContext, useEffect, useRef, useState } from 'react'
import { CommentContext } from "./CommentProvider"
import { UserContext } from "../users/UserProvider"
import "./Comment.css";


export const CommentList = (props) => {
    const { addComment, getCommentsByReading, comments, deleteComment, updateComment } = useContext(CommentContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)
    const [editMode, setEditMode] = useState(false)
    const [comment, setComment] = useState({})
    const commentRef = useRef(null)


    useEffect(() => {
        const readingId = parseInt(props.match.params.readingId)
        getCommentsByReading(readingId)
        getCurrentUser()
    }, [])

    const handleSubmit = () => {
        const readingId = parseInt(props.match.params.readingId)
        if(editMode){
            let newComment = comment
            newComment.comment = commentRef.current.value
            updateComment(newComment)
            .then(() => getCommentsByReading(readingId))
            .then(() => {
                document.getElementById("comment-form-id").reset()
                setEditMode(false)
            })
        }else{
            addComment({
                reading_id: readingId,
                comment: commentRef.current.value
            })
            .then(() => getCommentsByReading(readingId))
            .then(() => document.getElementById("comment-form-id").reset())
            
        }
    }

    const editDeleteButtons = (comment) => {
        const readingId = parseInt(props.match.params.readingId)

        if(currentUser.id === comment.tarotuser_id){

            return (
                <div className="commentButtonContainer">
                    <button
                        className="btn-small fa fa-edit"
                        onClick={() => {
                            setEditMode(true)
                            setComment(comment)
                            commentRef.current.value = comment.comment
                        }}></button>
                    <button
                        className="btn-small fa fa-trash"
                        onClick={() => {
                            deleteComment(comment.id)
                            .then(() => getCommentsByReading(readingId))
                        }}></button>

                </div>
            )
        }
    }

    return (
        <>
            <h2>Comments</h2>
            <form className="comment-form" id="comment-form-id">
                <fieldset>
                    <div className="form-group">
                        <textarea type="text" id="comment" ref={commentRef} required autoFocus className="form-control"
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
                    {editDeleteButtons(comment)}
                </div>
            })}
        </>
    )
}