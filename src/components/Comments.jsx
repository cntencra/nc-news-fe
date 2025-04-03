import { useContext } from "react"
import { getComments } from "../api"
import useApiRequest from "../useApiRequest"
import PostComment from "./PostComment"
import DeleteComment from "./DeleteComment"
import { UserContext } from "../contexts/User"

const Comments = ({articleId}) => {

    const { userName } = useContext(UserContext)

    const{data:comments, isLoading, error, setData} = useApiRequest(getComments, articleId)

    const addComment = (newComment) => {
        setData([...comments, newComment])
    }

    const onCommentDelete = (commentId) => {

        const commentsOneRemoved = comments.reduce((accumulator, comment)=>{
            if (comment.comment_id === commentId) {
                return accumulator
            }
            accumulator.push(comment);
            return accumulator;
        }, []);
        setData([...commentsOneRemoved])
    }

    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>


    return (
        <div id="comments-container">
            <h3>Comments</h3>
            <PostComment articleId={articleId} addComment={addComment} userName={userName}/>
            <ul>
                {comments.map((comment) => {
                    const date  = (new Date(comment.created_at)).toLocaleDateString('en-GB')
                    if(comment.author === userName){
                        return (
                        <li key={comment.comment_id} className="comment-list">
                            <h3 className="comment-author">{comment.author}</h3>
                            <p className="comment-date">{date}</p>
                            <p className="comment-body">{comment.body}</p>
                            <p className="comment-votes">Likes {comment.votes}</p>
                            <DeleteComment commentId={comment.comment_id} onCommentDelete={onCommentDelete}/>
                        </li>
                        )
                    }
                    return (
                    <li key={comment.comment_id} className="comment-list">
                        <h3 className="comment-author">{comment.author}</h3>
                        <p className="comment-date">{date}</p>
                        <p className="comment-body">{comment.body}</p>
                        <p className="comment-votes">Likes {comment.votes}</p>
                    </li>
                    )
                })}
            </ul>
        </div>
    )   

}

export default Comments