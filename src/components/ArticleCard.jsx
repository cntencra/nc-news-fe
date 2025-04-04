import { Link } from "react-router-dom"

const ArticleCard = ({article}) => {

    const date  = (new Date(article.created_at)).toLocaleDateString('en-GB')
    return (
   <div id="list-article-container">
        <h3> 
            <Link to={`/article/${article.article_id}`}>{article.title}</Link>
        </h3>
        <img src={article.article_img_url} alt="" />
        <div id="article-info">
            <p>{`Author: ${article.author}`}</p>
            <p>{`Topic: ${article.topic}`}</p>
            <p>{`Likes: ${article.votes}`}</p>
            <p>{`Comments: ${article.comment_count}`}</p>
            <p>{`${date}`}</p>
            
        </div>
    </div>
    
    )

}

export default ArticleCard