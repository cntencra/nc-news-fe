import { useEffect, useState } from "react"
import { getArticles } from "../api"
import ListArticle from "./ListArticle";

 const Articles = () => {

    const [articles, setArticles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        getArticles().then((articles) => {
            setArticles(articles)
        })
        .catch(() => {
            setIsError(true)
        })
        .finally(()=> {
            setIsLoading(false)
        })
    },[])

    if (isError) return <p>Error</p>

    if (isLoading) return <p>Loading...</p>
    
    return (
        <div id="articles-container">
            <ul>
            {articles.map((article)=> {
                return (
                <li key={article.article_id}>
                    <ListArticle article={article}/>
                </li>
                )
            })}
            </ul>
        </div>
    )
 }

 export default Articles