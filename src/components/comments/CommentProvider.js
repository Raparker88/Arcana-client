import React, { useState } from "react"

export const CommentContext = React.createContext()

export const CommentProvider = (props) => {

    const [comments, setComments] = useState([])
    

    const getCommentsByReading = (readingId) => {
        return fetch(`http://localhost:8000/comments?reading=${readingId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setComments)
    }
    const addComment = comment => {
        return fetch("http://localhost:8000/comments", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            
    }
    const updateComment = comment => {
        return fetch(`http://localhost:8000/comments/${comment.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("ar_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        })
            
    }

    const deleteComment = commentId => {
        return fetch(`http://localhost:8000/comments/${commentId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${localStorage.getItem("ar_token")}`},
        })
    }

    return (
        <CommentContext.Provider value={{
            getCommentsByReading, addComment, comments, deleteComment, updateComment
        }}>
            {props.children}
        </CommentContext.Provider>
    )
}
   

