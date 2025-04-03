import '../css/articles.css'
import { getArticles } from "../api"
import ListArticle from "./ListArticle";
import useApiRequest from "../useApiRequest";
import { useParams } from 'react-router-dom';

 const Articles = () => {

    const { topic } = useParams()

    const {data:articles, isLoading, error } = useApiRequest(getArticles, topic);
    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>
    
    return (
        <>
            {topic ? 
                <h2 id="articles-title">{topic.slice(0,1).toUpperCase() + topic.slice(1).toLowerCase()}</h2>
            :
                <h2 id="articles-title">All Articles</h2>
            }
            <ul id="articles-list">
            {articles.map((article)=> {
                return (
                <li key={article.article_id}>
                    <ListArticle article={article}/>
                </li>
                )
            })}
            </ul>
        </>
    )
 }

 export default Articles