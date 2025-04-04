import '../css/articles.css'
import { getArticles } from "../api"
import ListArticle from "./ListArticle";
import useApiRequest from "../useApiRequest";
import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

 const Articles = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const sortByQuery = searchParams.get("sort_by");
    const orderQuery = searchParams.get("order");
    const topicQuery = searchParams.get("topic");

    console.log(searchParams)
    
    const {data:articles, isLoading, error } = useApiRequest(getArticles, searchParams);

    const setSortType = (type) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', type)
        setSearchParams(newParams)
    }

    const setOrder = (order) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', order)
        setSearchParams(newParams)
    }

    useEffect(() => {

    },[sortByQuery,orderQuery, topicQuery])

    if (error) return <p>Error {error.msg}</p>

    if (isLoading) return <p>Loading... </p>
    
    return (
        <>
            <div id="sort-by-container">
                <div className="sort-dropdown">
                    <div className="sort-btn">
                        <h3>sort by▼</h3>
                    </div>
                    <ul className="sort-dropdown-content">
                        <li><button onClick={()=>{setSortType('created_at')}}>date</button></li>
                        <li><button onClick={()=>{setSortType('comment_count')}}>comment count</button></li>
                        <li><button onClick={()=>{setSortType('votes')}}>votes</button></li>
                    </ul>
                </div>
                <div className="sort-dropdown">
                    <div className="sort-btn">
                        <h3>order▼</h3>
                    </div>
                    <ul className="sort-dropdown-content">
                        <li><button onClick={()=>{setOrder('desc')}}>highest first</button></li>
                        <li><button onClick={()=>{setOrder('asc')}}>lowest first</button></li>
                    </ul>
                </div>
            </div>
            <h2 id="articles-title">Articles</h2>
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