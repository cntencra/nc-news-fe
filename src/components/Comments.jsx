import { getComments } from "../api"
import useApiRequest from "../useApiRequest"

const Comments = ({articleId}) => {

    const{data:comments, isLoading, error} = useApiRequest(getComments, articleId)

    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>


    return (
        <div id="comments-container">
            <h3>Comments</h3>
            <ul>
                {comments.map((comment) => {
                    const date  = (new Date(comment.created_at)).toLocaleDateString('en-GB')
                    return (
                    <li key={comment.comment_id} id="comment-list">
                        <h3 id="comment-author">{comment.author}</h3>
                        <p id="comment-date">{date}</p>
                        <p id="comment-body">{comment.body}</p>
                        <p id="comment-votes">Votes {comment.votes}</p>
                    </li>
                    )
                })}
            </ul>
        </div>
    )

}

export default Comments