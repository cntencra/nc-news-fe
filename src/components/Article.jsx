import { useParams } from "react-router-dom"
import useApiRequest from "../useApiRequest";
import { getArticle } from "../api";

const Article = () => {

    const { article_id } = useParams();
    const{data:article, isLoading, error} = useApiRequest(getArticle, article_id)

    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>
    const date  = (new Date(article.created_at)).toLocaleDateString('en-GB')
    console.log(date)
    return (
        <div id="article-container">
            <h2>{article.title}</h2>
            <img src={article.article_img_url} alt="" />
            <p>Author | {article.author}</p>
            <p>{date}</p>
            <p>{article.body}</p>
            
        </div>
    )


}
export default Article