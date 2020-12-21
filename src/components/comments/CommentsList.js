import React, { useContext, useEffect } from 'react'
import { CommentContext } from "./CommentProvider"
import "./Comment.css";


export const CommentList = (props) => {
    const { addComment, getCommentsByReading, comments } = useContext(CommentContext)


    useEffect(() => {
        const readingId = parseInt(props.match.params.readingId)
        getCommentsByReading(readingId)
    },[]) 
    
    
    return (
        <>
            <h2>Comments</h2>
            {comments.map(comment => {
                return <div key={comment.id} className="comment-detail">
                    <div>{new Date(comment.date_created).toDateString()}</div>
                    <div >{comment.comment}</div>
                </div>
            })}
        </>
    )
}