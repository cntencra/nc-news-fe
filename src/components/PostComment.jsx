import { useState } from "react"
import { postComment } from "../api";

const PostComment = ({articleId, addComment, userName}) => {

    const [comment, setComment] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSuccessful, setIsSuccesful] = useState(false);

    const handleComment = (event) => {
        setComment(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        if (comment.length === 0) return

        setIsLoading(true);

        postComment(articleId, userName, comment).then((newComment)=> {
            setIsLoading(false);
            setError(null);
            setComment("");
            addComment(newComment);
            setIsSuccesful(true);

        }).catch((err) => {
            setError({status:404, msg: `Failed to send`});
        });
    };

    const resetError = () => {
        setError(null)
        setIsLoading(false)
    }

    const resetIsSuccessful = () => {
        setIsSuccesful(false);
    }


    if (error) return (
        <div id="post-comment-error">
            <p>Error failed to post comment {error.status} {error.msg}</p>
            <button onClick={resetError}>Retry</button>
        </div>
    ) 

    if (isLoading) return (
        <div id="post-comment-loading">
            <p>Attempting to post...</p>
        </div>
    )

    if (isSuccessful) {
        return (
        <div id="post-comment-successful">
            <p>Your Post was successful!</p>
            <button onClick={resetIsSuccessful} id="post-succesful-button">New Post</button>
        </div>
        )
    }


    return(
        <form onSubmit={handleSubmit} id="post-comment">
            <h3>Add a comment</h3>
            <textarea type="text" name="comment-text" id="post-comment-input" onChange={handleComment} maxLength={150} value={comment}/>
            <button type="submit" id="post-comment-submit">
                Post
            </button>

        </form>
    )

}

export default PostComment