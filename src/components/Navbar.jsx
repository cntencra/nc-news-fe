import { Link, Links } from "react-router-dom"
import useApiRequest from "../useApiRequest";
import { useState } from "react";
import { getTopics } from "../api";
import ErrorMsg from "./ErrorMsg";

const Navbar = () => {

    const {data:topics, isLoading, error } = useApiRequest(getTopics)

    return (
        <nav>
            <Link to ="/articles">
                <div id="articles-nav" className="nav-div"><h2>Articles</h2></div>
            </Link>
            
            <div className="topics-dropdown">

                <div className="nav-div nav-topic-title">
                    <h2 >Topics</h2>
                </div>

            {
            isLoading ?
            <ul className="topics-dropdown-content">
                <li className="topic-dropdown">
                    Loading topics ...
                </li>
            </ul>
            :
            error ?
            <ul className="topics-dropdown-content">
                <li className="topic-dropdown">
                    <ErrorMsg error={error}/>
                </li>
            </ul>
            :
            <ul className="topics-dropdown-content">
                {topics.map((topic)=> {
                    return (
                    <li key={topic.slug} className="topic-list-item">
                        <Link to={`/articles/?topic=${topic.slug}`} >
                            {topic.slug.slice(0,1).toUpperCase() + topic.slug.slice(1).toLowerCase()}
                        </Link>
                    </li>
                    )
                })}
            </ul> 
            }
            </div>
            <Link to ="/loading">
                <div id="loading-nav" className="loading-div"><h2>Loading</h2></div>
            </Link>

        </nav>
    )

}

export default Navbar