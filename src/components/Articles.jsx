import '../css/articles.css'
import { getArticles } from "../api"
import ListArticle from "./ListArticle";
import useApiRequest from "../useApiRequest";

 const Articles = () => {

    const {data:articles, isLoading, error } = useApiRequest(getArticles);

    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>
    
    return (
            <ul id="articles-list">
            {articles.map((article)=> {
                return (
                <li key={article.article_id}>
                    <ListArticle article={article}/>
                </li>
                )
            })}
            </ul>
    )
 }

 export default Articles