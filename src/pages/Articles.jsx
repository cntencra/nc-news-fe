import '../css/articles.css'
import { getArticles } from "../api"
import ArticleCard from "../components/ArticleCard";
import useApiRequest from "../useApiRequest";
import {  useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import ErrorMsg from '../components/ErrorMsg';
import Loading from './Loading';

 const Articles = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const sortByQuery = searchParams.get("sort_by");
    const orderQuery = searchParams.get("order");
    const topicQuery = searchParams.get("topic");
    
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

    if (error) return <ErrorMsg error={error} />

    if (isLoading) return <Loading/>
    
    return (
        <>
            <div id="sort-by-container">
                <div className="sort-dropdown">
                    <div className="sort-btn">
                        <h5>sort▼</h5>
                    </div>
                    <ul className="sort-dropdown-content">
                        <li><button className="dropdown-btn" onClick={()=>{setSortType('created_at')}}>Date</button></li>
                        <li><button className="dropdown-btn" onClick={()=>{setSortType('comment_count')}}>Comments</button></li>
                        <li><button className="dropdown-btn" onClick={()=>{setSortType('votes')}}>Popular</button></li>
                    </ul>
                </div>
                <div className="sort-dropdown">
                    <div className="sort-btn">
                        <h5>order▼</h5>
                    </div>
                    <ul className="sort-dropdown-content">
                        <li><button className="dropdown-btn" onClick={()=>{setOrder('desc')}}>Highest</button></li>
                        <li><button className="dropdown-btn" onClick={()=>{setOrder('asc')}}>Lowest</button></li>
                    </ul>
                </div>
            </div>
            <h2 id="articles-title">Articles</h2>
            <ul id="articles-list">
            {articles.map((article)=> {
                return (
                <li key={article.article_id}>
                    <ArticleCard article={article}/>
                </li>
                )
            })}
            </ul>
        </>
    )
 }

 export default Articles