import { useState } from "react"
import {  patchArticleVotes } from "../api"

const ArticleVotes = ({article}) => {

    const [optimisticVotes, setOptimisticVotes] = useState(0)

    const handleVote = (newVote) => {


        setOptimisticVotes((optimisticVotes)=> {
            return optimisticVotes + newVote
        })

        patchArticleVotes(article.article_id,newVote)
        .catch(()=>{
            setOptimisticVotes((optimisticVotes) => {
                return optimisticVotes - newVote
            }
            );
        })
        
    }

    return (
        <div className="vote-card">
            <div className="article-votes">
                Likes {article.votes + optimisticVotes}
            </div>
            <button className="article-thumb-up" onClick={() => handleVote(1)}>
                <img src="../../src/assets/thumbs-up-svgrepo-com.svg" alt="Up vote" />
            </ button>
            <button className="article-thumb-down" onClick={() => handleVote(-1)}>
                <img src="../../src/assets/thumb-down-svgrepo-com.svg" alt="Down vote" />
            </button>

        </div>
    )

}

export default ArticleVotes