import { Link } from "react-router-dom"
import useApiRequest from "../useApiRequest";
import { getTopics } from "../api";
import ErrorMsg from "./ErrorMsg";

const Navbar = () => {

    const {data:topics, isLoading, error } = useApiRequest(getTopics)

    return (
        <nav>
            <Link to ="/">
                <div id="home-nav" className="nav-div"><h2>Home</h2></div>
            </Link>
            
            
            <div className="topics-dropdown">

                <Link to={`articles/?order=desc&sort_by=votes`}>
                <div className="nav-div nav-topic-title">
                    <h2 >Topics</h2>
                </div>
                </Link>

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

            <Link to ="/user">
                <div id="user-nav" className="nav-div"><h2>My Comments</h2></div>
            </Link>

        </nav>
    )

}

export default Navbar