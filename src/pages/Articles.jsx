import '../css/articles.css'
import { getArticles } from "../api"
import ArticleCard from "../components/ArticleCard";
import {  useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import ErrorMsg from '../components/ErrorMsg';
import Loading from './Loading';
import LoadingSpinner from '../components/LoadingSpinner';

 const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();

    const [searchParams, setSearchParams] = useSearchParams();
    
    const sortByQuery = searchParams.get("sort_by") || "";
    const orderQuery = searchParams.get("order") || "";
    const topicQuery = searchParams.get("topic") || "";
   

    const updateParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value)
        setSearchParams(newParams)
    }

    useEffect(() => {
        setArticles(() => [])
        setPage(1)
        setHasMore(true)
    },[ sortByQuery, orderQuery,topicQuery])

    useEffect (() => {
        const fetchItems= async () => {
            setIsLoading(true);
            setError(null)
            try {
                
                const params = Object.fromEntries(searchParams.entries())
                const data = await getArticles({...params, limit: 10, p:page})
                
                setArticles((prev) => {
                    return page === 1 ? data : [...prev,...data]
                })
                if(data.length === 0) setHasMore(false);
            } catch (error) {
                setError(true)
                
            } finally {
                setIsLoading(false)
            }
        }

        if(hasMore){
            fetchItems()
        }
        
 
    }, [page, sortByQuery, orderQuery, topicQuery]) 

    const lastItemRef = useCallback(node => {
        if(isLoading) return
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver (entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev +1);
            }
        })

        if(node) observer.current.observe(node)
    }, [isLoading, hasMore])


    if (error) return <ErrorMsg error={error} />

    const initialLoad = page === 1 && articles.length === 0 && isLoading;

    if (initialLoad) return <Loading/>
    
    return (
        <>
            <div id="sort-by-container">
                <div className="sort-dropdown">
                    <div className="sort-btn">
                        <h5>sort▼</h5>
                    </div>
                    <ul className="sort-dropdown-content">
                        <li key={'date'}><button className="dropdown-btn" onClick={()=>{updateParams('sort_by','created_at')}}
                            >Date</button></li>
                        <li key={'comments'}><button className="dropdown-btn" onClick={()=>{updateParams('sort_by','comment_count')}}>Comments</button></li>
                        <li key={'votes'}><button className="dropdown-btn" onClick={()=>{updateParams('sort_by','votes')}}>Popular</button></li>
                    </ul>
                </div>
                <div className="sort-dropdown">
                    <div className="sort-btn">
                        <h5>order▼</h5>
                    </div>
                    <ul className="sort-dropdown-content">
                        <li key={'highest'}><button className="dropdown-btn" onClick={()=>{updateParams('order','desc')}}>Highest</button></li>
                        <li key = {'lowest'}><button className="dropdown-btn" onClick={()=>{updateParams('order','asc')}}>Lowest</button></li>
                    </ul>
                </div>
            </div>
            <h2 id="articles-title">Articles</h2>
            <ul id="articles-list">
            {articles.map((article, index)=> {
                if (index === articles.length - 1) {
                    return (
                    <li ref={lastItemRef} key={article.title}>
                        <ArticleCard article={article}/>
                    </li>
                    )
                } else {
                    return (
                    <li key={article.title}>
                        <ArticleCard article={article}/>
                    </li>
                    )
                }
                
            })}
            
            </ul>
            <div className="more-articles-container">
                {hasMore ?<div className="more-articles"> <LoadingSpinner/></div>: (
                    <div className="more-articles">
                        <p>
                            🎉 You’ve reached the end!
                        </p>
                    </div>
                )}
            </div>
        </>
    )
 }

 export default Articles