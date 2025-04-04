import { useContext } from "react"
import { UserContext } from "../contexts/User"
import { getUserComments } from "../api"
import '../css/user-profile.css'
import useApiRequest from "../useApiRequest"
import DeleteComment from "./DeleteComment"

const UserProfile = () => {

    const { userName } = useContext(UserContext)

    const{data:comments, isLoading, error, setData} = useApiRequest(getUserComments, userName)


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

    if (error) return <ErrorMsg error={error} />

    if (isLoading) return <p>Loading... </p>


    return (
        <div id="user-comments-container">
            <h2 id="user-comment-title">{userName}'s' Comments</h2>
            <ul>
                {comments.map((comment) => {
                    const date  = (new Date(comment.created_at)).toLocaleDateString('en-GB')
                    if(comment.author === userName){
                        return (
                        <li key={comment.comment_id} className="user-comment-list">
                            <h3 className="user-comment-author">{comment.author}</h3>
                            <p className="user-comment-date">{date}</p>
                            <p className="user-comment-body">{comment.body}</p>
                            <p className="user-comment-votes">Likes {comment.votes}</p>
                            <DeleteComment commentId={comment.comment_id} onCommentDelete={onCommentDelete}/>
                        </li>
                        )
                    }
                })
            }
            </ul>
        </div>
        )
                

} 

export default UserProfile