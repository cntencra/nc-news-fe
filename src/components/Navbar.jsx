import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <Link to ="/articles">
                <div id="articles-nav" className="nav-div"><h2>Articles</h2></div>
            </Link>
            <div id="topics-nav-dropdown" className="nav-div"><h2>Topics</h2></div>
        </nav>
    )

}

export default Navbar