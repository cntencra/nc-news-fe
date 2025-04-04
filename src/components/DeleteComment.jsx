import { useState } from "react";
import { deleteComment } from "../api"

const DeleteComment = ({commentId, onCommentDelete}) => {

    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeComment = ( commentId) => {
   
        setIsLoading(true);
         deleteComment(commentId).then(()=>{
            setError(null);
            onCommentDelete(commentId);
         })
         .catch(()=> {
            setError(true);
         })
         .finally(()=>{
            setIsLoading(false)
         })
    }

    const resetError = () => {
        setError(null)
        setIsLoading(false)
    }


    if (error) {
        return (
            <div id="delete-comment-unsuccessful">
                <p>Your Delete was unsuccessful!</p>
                <button onClick={resetError} id="delete-error-button">OK</button>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div id="delete-comment-loading">
                <p>Trying to delete...</p>
            </div>
        )
    }

    return (
    <button className="comment-delete" onClick={() => removeComment( commentId)}>
        <img src="https://www.svgrepo.com/show/380116/trash-delete-bin.svg" alt="Delete comment" />
    </button>
    )

}

export default DeleteComment